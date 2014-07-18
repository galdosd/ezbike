/*function output( number ) {

};*/


$("#start").geocomplete({
  details: ".details",
  detailsAttribute: "data-geo"
});

$("#finish").geocomplete({
  details: ".details2",
  detailsAttribute: "data-geo"
});

//http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?home_latitude=5.5&home_longitude=0&work_latitude=40.714&work_longitude=-73.989
var Go = $( "#go" );
var where = $( "#where" );
var work = $( "#work" );

Go.click( callNav );

var start = $( "#start" ).val();



function callNav( e ){
	e.preventDefault();

	navigator.geolocation.getCurrentPosition(function( position ) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		where.text( "The latitude is "
		 + latitude
		 + " and the longitude is " + longitude + " good luck");
		callApi( latitude, longitude );
	}); 
};

var inputS = $( "#sFind" );
inputS.click( inputStart );

function inputStart( e ){

	/*if ( start == "" || start == " " ) {
		alert( "please enter an address" );
		console.log( "what" );
		e.stopPopogation();
		return;
	}*/

//	else { 
		var latitude = $( "#startLat" ).text().trim();
		var longitude =$( "#startLong" ).text().trim();	
		callApi( latitude, longitude );
//	}
};

var inputE = $( "#eFind" );
inputE.click( inputEnd );

function inputEnd(){
	var latitude = $( "#endLat" ).text().trim();
	var longitude =$( "#endLong" ).text().trim();
	callApiE( latitude, longitude ); 
}

/*function callApi( hLatitude, hLongitude, wLatitude, wLongitude ){
 	$.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
		+"home_latitude="
		+hLatitude
		+"&home_longitude="
		+hLongitude
		+"&work_latitude="
		+wLatitude
		+"&work_longitude="
		+wLongitude, answer,
		console.log( data );
    );
};*/

function callApi( hLatitude, hLongitude ){
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
		+"home_latitude=0"
		+"&home_longitude=0"
		+"&work_latitude="
		+wLatitude
		+"&work_longitude="
		+wLongitude, answerE
    );
};

function answer( data ) {
    put_data_into_start( data, 0 );
    put_data_into_start( data, 1 );
    put_data_into_start( data, 2 );
};

function answerE( data ) {
    put_data_into_end( data, 0 );
    put_data_into_end( data, 1 );
    put_data_into_end( data, 2 );
};

function put_data_into_start( data, number ) {
	var start = $( '#start' + number );
	start.text(
		 data.begin_at[ number ].slots
		 + " bikes at "
		 + data.begin_at[ number ].name  
		 + ", " 
		 + Math.round( data.begin_at[ number ].blocks )  
		 + " blocks away"
	);
};

function put_data_into_end( data, number ) {
	var end = $( "#end" + number );
	end.text(
		 data.finish_at[ number ].slots
		 + " docks at "
		 + data.finish_at[ number ].name  
		 + ", " 
		 + Math.round( data.finish_at[ number ].blocks )  
		 + " blocks away"
	);

};

/*window.put_data_into_end = function ( data, number ) {
	var end = $( "#end" + number );
	end.text(
		 data.finish_at[ number ].slots
		 + " docks at "
		 + data.finish_at[ number ].name  
		 + ", " 
		 + Math.round( data.finish_at[ number ].blocks )  
		 + " blocks away"
	);

};*/



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