
/*function output( number ) {

};*/
var latitude;
var longitude;


//http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?home_latitude=5.5&home_longitude=0&work_latitude=40.714&work_longitude=-73.989
var click = $( "#click" );
var where = $( "#where" );

click.click(function(){
	navigator.geolocation.getCurrentPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		where.text( "The latitude is "
		 + latitude
		  + " and the longitude is " + longitude + " good luck");

var work = $( "#work" );

	work.click(function(){
	 	$.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
			+"home_latitude="
			+latitude
			+"&home_longitude="
			+longitude
			+"&work_latitude=55.714"
			+"&work_longitude=-65.989",
			 $.each(results[0].address_components, function(){
             $("#start").find('input[name="'+ this.types+'"]').attr('value', this.long_name);
            }
	    );
	    function work( data ) {
	    	var start0 = $( '#start0' );
	    	start0.text(
	    		 data.begin_at[0].slots
	    		 + " bikes at "
	    		 + data.begin_at[0].name  
	    		 + ", " 
	    		 + data.begin_at[0].blocks  
	    		 + " blocks away"
	    	);
	    };
	}); 


	});
});

//already able to generate lat and long from location on click
//need to put that lat and long into API web address
//goal to output start statation.... on click of another button



/*button.click(function(){
		where.text( latitude );*/