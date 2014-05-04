#!/usr/bin/perl

use strict; 
use warnings;
use CGI;
my $cgi = CGI->new;
use JSON::PP;
use Data::Dumper;
use Math::Trig qw/ pi great_circle_distance /;

my $min_bikes = 5;
my $min_docks = 5;
my $home = [ clean_param($cgi, 'home_latitude', 40.714), clean_param($cgi, 'home_longitude', -73.99) ];
my $work = [ clean_param($cgi, 'work_latitude', 40.707), clean_param($cgi, 'work_longitude', -74.01) ];

sub clean_param {
    my ($cgi, $param_name, $default_value) = @_;
    my $param_value = $cgi->param($param_name);
    if(defined $param_value && "$param_value" =~ /^(0|[1-9]\d*)(\.\d+)?$/) {
        return 1.0 * $param_value;
    }
    else {
        return $default_value;
    }
}

my $stations = JSON::PP->new->ascii->decode(`curl -s https://citibikenyc.com/stations/json/`)->{stationBeanList};

my %station_info = map {
    my $s=$_;
    $s->{stationName} => {
        bikes => $s->{availableBikes},
        docks => $s->{availableDocks},
        service => $s->{statusValue} eq "In Service",
        latitude => $s->{latitude},
        longitude => $s->{longitude},
        name => $s->{stationName},
        home => earth_distance( @$home, $s->{latitude}, $s->{longitude} ),
        work => earth_distance( @$work, $s->{latitude}, $s->{longitude} ),
    }
} @{ $stations };

print "Content-type: application/json\n\n";
my $tour = compute_tour('home' => 'work');
print JSON::PP->new->utf8->canonical->pretty->encode($tour);
exit 0;

sub compute_tour {
    my ($start, $finish) = @_;
    my @home_stations = nearest_stations(
        Location => $start,
        Bikes => $min_bikes,
    );

    my @work_stations = nearest_stations(
        Location => $finish,
        Docks => $min_docks,
    );

    my ( @home_station_info, @work_station_info);
    for my $s (@home_stations[0..2]) {
         push @home_station_info, $station_info{$s};
    }
    for my $s (@work_stations[0..2]) {
         push @work_station_info, $station_info{$s};
    }
    return {
        begin_at => \@home_station_info,
        finish_at => \@work_station_info
    };
}

sub nearest_stations {
    my %args = @_;
    my $location = $args{Location};
    my $resource = defined $args{Bikes} ? 'bikes' : 'docks';
    my $min_resources = $resource eq 'bikes' ? $args{Bikes} : $args{Docks};
    my @res = ();
    for my $s (sort { 
        $station_info{$a}->{$location} <=> $station_info{$b}->{$location}
        } keys %station_info)
    {

        next unless $station_info{$s}->{service};
        next unless $station_info{$s}->{$resource} >= $min_resources;
        $station_info{$s}->{slots} = $station_info{$s}->{$resource};
        $station_info{$s}->{blocks} = $station_info{$s}->{$location};
        push @res, $s;

    }
    return @res;
}



sub earth_distance {
    my $Earth_radius_in_miles = 3963.1906;
    my ($lat0, $lon0, $lat1, $lon1) = map { $_ * pi / 180.0 }  @_;
    return great_circle_distance(
        $lon0, pi/2 - $lat0,
        $lon1, pi/2 - $lat1, $Earth_radius_in_miles * 20
    );
}
