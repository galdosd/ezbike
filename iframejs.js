/*function output( number ) {

};*/


$("input").geocomplete({
  details: ".details",
  detailsAttribute: "data-geo"
});



//http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?home_latitude=5.5&home_longitude=0&work_latitude=40.714&work_longitude=-73.989
var Go = $( "#go" );

Go.click( callNav );

function callNav(){
	navigator.geolocation.getCurrentPosition(function( position ) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		where.text( "The latitude is "
		 + latitude
		 + " and the longitude is " + longitude + " good luck");
		callApi( latitude, longitude );
	}); 
};

var inputE = $( "#eFind" );
inputE.click( inputEnd );

function inputEnd(){
	var latitude = $( "#endLat" ).text().trim();
	var longitude = $( "#endLong" ).text().trim();
	callApiE( latitude, longitude ); 
};


function callApiE( wLatitude, wLongitude ){
 	$.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
		+"home_latitude=0"
		+"&home_longitude=0"
		+"&work_latitude="
		+wLatitude
		+"&work_longitude="
		+wLongitude, answerE
    );
};


function answerE( data ) {
    put_data_into_end( data, 0 );
    put_data_into_end( data, 1 );
    put_data_into_end( data, 2 );
};


function put_data_into_end( data, number ) {
	window.parent.put_data_into_end( data, number );
};
