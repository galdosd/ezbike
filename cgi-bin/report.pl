#!/usr/bin/env perl

use strict; 
use warnings;
use JSON::PP;
use Data::Dumper;
use Math::Trig qw/ pi great_circle_distance /;

my $min_bikes = 5;
my $min_docks = 5;
my $home = [ 40.715, -73.955 ];
my $work = [ 40.702419,-74.012398 ];

# ($home, $work) = ($work, $home);

my $stations = JSON::PP->new->ascii->decode(`curl -s https://citibikenyc.com/stations/json/`)->{stationBeanList};

my %station_info = map {
    my $s=$_;
    $s->{stationName} => {
        bikes => $s->{availableBikes},
        docks => $s->{availableDocks},
        service => $s->{statusValue} eq "In Service",
        home => earth_distance( @$home, $s->{latitude}, $s->{longitude} ),
        work => earth_distance( @$work, $s->{latitude}, $s->{longitude} ),
    }
} @{ $stations };


print "Content-type: application/json\n\n";

my $tour = compute_tour('home' => 'work');
print JSON::PP->new->utf8->encode($tour);
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
    return {
        begin_at => map { $station_info{$_} } @home_stations[0..2],
        finish_at => map { $station_info{$_} } @work_stations[0..2],
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
        # push @res, $station_info{$s};
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
