function output( number ) {

}


$("#start").geocomplete({
  details: ".details",
  detailsAttribute: "data-geo"
});

$("#finish").geocomplete({
  details: ".details2",
  detailsAttribute: "data-geo"
});

var words = $( ".words" );

$("#about").click( show );

function show(){
	words.addClass( "show");
}

$( ".x" ).click( hide );

function hide(){
	words.removeClass( "show" );
}



//http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?home_latitude=5.5&home_longitude=0&work_latitude=40.714&work_longitude=-73.989
var Go = $( "#go" );
var where = $( "#where" );
var work = $( "#work" );
var start = $( "#start" );
var finish = $( "#finish" );
var sVal = $( "#start" ).val();

//

Go.click( callNav );

var inputS = $( "#sFind" );
inputS.click( inputStart );

$("#start")
  .geocomplete()
  .bind("geocode:result", function(event, result){
    inputStart();
  });

  $("#finish")
  .geocomplete()
  .bind("geocode:result", function(event, result){
    inputEnd();
  });


start.keypress( function (e){
	if(e.which == 13){
		inputStart();
	}
});

var inputE = $( "#eFind" );
inputE.click( inputEnd );

finish.keypress( function (e){
	if(e.which == 13){
		inputEnd();
	}
});

//

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

function inputStart( e ){
	console.log( "start working" );
	var sAt = $( ".sAt" );
	sAt.addClass( "showS" );

	/*if ( sVal == "" || sVal == " " ) {
		alert( "please enter an address" );
		console.log( "what" );
		return;
	}

	{*/ 
		var latitude = $( "#startLat" ).text().trim();
		var longitude =$( "#startLong" ).text().trim();	
		callApi( latitude, longitude );
	//}
};

function inputEnd(){
	var latitude = $( "#endLat" ).text().trim();
	var longitude =$( "#endLong" ).text().trim();
	callApiE( latitude, longitude ); 
};

/*function callApi( hLatitude, hLongitude ){
	console.log('calling api');
 	$.ajax({ 
 		url: "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
		+"home_latitude="
		+hLatitude
		+"&home_longitude="
		+hLongitude
		+"&work_latitude=55.714"
		+"&work_longitude=-65.989"
		+"&callback=?",
		dataType: 'jsonp',
		//jsonpCallback: 'jsonCallback',
		//contentType: "application/json",
		success: function(data) {
			console.log(data);
			data = $.parseJSON(data);
			answer(data);
			console.log( "answer" );
		},
		error: function(e){
			console.log(e.message);
		}
    });
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
	start.html(
		"<div class='output'>"
		 +"<span class='number'>"
		 + data.begin_at[ number ].slots
		 +"</span>"
		 + "<span class='docks'> bikes at </span>"
		 + data.begin_at[ number ].name  
		 + ", " 
		 + Math.round( data.begin_at[ number ].blocks )  
		 + " blocks away"
		 +"</div>"
	);
};

function put_data_into_end( data, number ) {
	var end = $( "#end" + number );
	end.html(
		"<div class='output'>"
		 +"<span class='number'>"
		 + data.finish_at[ number ].slots
		 +"</span>"
		 + "<span class='docks'> docks at </span>"
		 + data.finish_at[ number ].name  
		 + ", " 
		 + Math.round( data.finish_at[ number ].blocks )  
		 + " blocks away"
		 +"</div>"
	);
};
