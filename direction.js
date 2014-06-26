/*function output( number ) {

};*/


$("input").geocomplete({
  details: ".details",
  detailsAttribute: "data-geo"
});

//http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?home_latitude=5.5&home_longitude=0&work_latitude=40.714&work_longitude=-73.989
var Go = $( "#go" );
var where = $( "#where" );
var work = $( "#work" );

Go.click( callNav );

function callNav(){
	navigator.geolocation.getCurrentPosition(function( position ) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		where.text( "The latitude is "
		 + latitude
		 + " and the longitude is " + longitude + " good luck");
		callApiS( latitude, longitude );
	}); 
};

var inputS = $( "#sFind" );
inputS.click( inputStart );

function inputStart(){
	var latitude = $( "#startLat" );
	var longitude =$( "#startLong" );
	callApiS( latitude, longitude );
};

var inputE = $( "#eFind" );
inputE.click( inputE );

function inputEnd(){
	var latitude = $( "#endLat" );
	var longitude =$( "#endLong" );
	callApiE( latitude, longitude ); 

}

function callApiS( hLatitude, hLongitude ){
 	$.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
		+"home_latitude="
		+hLatitude
		+"&home_longitude="
		+hLongitude
		+"&work_latitude=55.714"
		+"&work_longitude=-65.989", answer
    );
};

function callApiE( wLatitude, wLongitude ){
 	$.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
		+"home_latitude="
		+wLatitude
		+"&home_longitude="
		+wLongitude
		+"&work_latitude=55.714"
		+"&work_longitude=-65.989", answer
    );
};

function answer( data ) {
    put_data_into( data, 0 );
    put_data_into( data, 1 );
    put_data_into( data, 2 );
};

function put_data_into( data, number ) {
	var start = $( '#start' + number );
	var end = $( "#end" + number);
	start.text(
		 data.begin_at[ number ].slots
		 + " bikes at "
		 + data.begin_at[ number ].name  
		 + ", " 
		 + data.begin_at[ number ].blocks  
		 + " blocks away"
	);
	end.text(
		 data.begin_at[ number ].slots
		 + " bikes at "
		 + data.begin_at[ number ].name  
		 + ", " 
		 + data.begin_at[ number ].blocks  
		 + " blocks away"
	);
};

/*Go.click(function GO(){
	callNav();
	callApi();
	answer( data );
});*/

//already able to generate lat and long from location on click
//need to put that lat and long into API web address
//goal to output start statation.... on click of another button



/*button.click(function(){
		where.text( latitude );*/