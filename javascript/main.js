/*jslint couch: false, node: false, rhino: false, passfail: false, debug: true, plusplus: true, vars: true, white: true */
/*globals $ */

(function(){

	$(document).ready(function(){

        function show_map(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // let's show a map or do something interesting!
}

//form verification start
	useLo = $( '#useLo' );
	Go = $( '#go' );
	Go.on(
	'click'
	, function( e ) {

	e.preventDefault();

			// grab the task in the input field
			var start = $( '#start' ).val();


			if ( start == "" || start == " " ) {
				alert( 'where you at?' );
				e.stopPropagation();
				//done
				return;
			}

			var finish = $( '#finish' ).val();


			if ( finish == "" || finish == " " ) {
				alert( 'where you going to?' );
				e.stopPropagation();
				//done
				return;
			}


      	// if we made it here, then valid
      	else { $.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
    		+start
    		+finish ,
    		//+"home_latitude=5.5"
    		//+"&home_longitude=0"
    		//+"&work_latitude=40.714"
    		//+"&work_longitude=-73.989",
            $.each(results[0].address_components, function(){
             $("#start").find('input[name="'+ this.types+'"]').attr('value', this.long_name);
            };

    		 function ( data ) {
    		 	var start0 = $( '#start0' );
    		 	var start1 = $( '#start1' );
    		 	var start2 = $( '#start2' );
    		 	var finish0 = $( '#finish0' );
    		 	var finish1 = $( '#finish1' );
    		 	var finish2 = $( '#finish2' );
    		 	var tooFar = data.begin_at[0].blocks
    		 	var warning = $( '.warning');
    		 	start0.text(
    		 		data.begin_at[0].slots
    		 		+ " bikes at "
    		 		+ data.begin_at[0].name  
    		 		+ ", " 
    		 		+ data.begin_at[0].blocks  
    		 		+ " blocks away"
    		 	);
    		 	start1.text(
    		 		data.begin_at[1].slots
    		 		+ " bikes at "
    		 		+ data.begin_at[1].name 
    		 		+ ", " 
    		 		+ data.begin_at[1].blocks 
    		 		+ " blocks away"
    		 	);
    		 	start2.text(
    		 		data.begin_at[2].slots
    		 		+ " bikes at "
    		 		+ data.begin_at[2].name
    		 		+ ", " 
    		 		+ data.begin_at[2].blocks 
    		 		+ " blocks away"
    		 	);
    		 	finish0.text(
    		 		data.finish_at[0].slots
    		 		+ " docks at "
    		 		+ data.finish_at[0].name 
    		 		+ ", " 
    		 		+ data.finish_at[0].blocks 
    		 		+ " blocks away"
    		 	);
    		 	finish1.text(
    		 		data.finish_at[1].slots
    		 		+ " docks at "
    		 		+ data.finish_at[1].name
    		 		+ ", " 
    		 		+ data.finish_at[1].blocks
    		 		+ " blocks away"
    		 	);
    		 	finish2.text(
    		 		data.finish_at[2].slots
    		 		+ " docks at "
    		 		+(data.finish_at[2].name) 
    		 		+ ( ", " )
    		 		+ ( data.finish_at[2].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	if(tooFar > 20) {
    		 		warning.text("That's pretty far bro, maybe you shouldn't bike");
    		 	}

    		 }
    	); 
      		
      	}	
      }
      );

	//form verification end

    	/*var start = $( '#start' ).val();
    	var finish = $( '#finish' ).val();

    	$.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
    		+start
    		+finish ,
    		//+"home_latitude=5.5"
    		//+"&home_longitude=0"
    		//+"&work_latitude=40.714"
    		//+"&work_longitude=-73.989",
    		 function ( data ) {
    		 	var start0 = $( '#start0' );
    		 	var start1 = $( '#start1' );
    		 	var start2 = $( '#start2' );
    		 	var finish0 = $( '#finish0' );
    		 	var finish1 = $( '#finish1' );
    		 	var finish2 = $( '#finish2' );
    		 	var tooFar = data.begin_at[0].blocks
    		 	var warning = $( '.warning');
    		 	start0.text(
    		 		data.begin_at[0].slots
    		 		+ " bikes at "
    		 		+ data.begin_at[0].name  
    		 		+ ", " 
    		 		+ data.begin_at[0].blocks  
    		 		+ " blocks away"
    		 	);
    		 	start1.text(
    		 		data.begin_at[1].slots
    		 		+ " bikes at "
    		 		+ data.begin_at[1].name 
    		 		+ ", " 
    		 		+ data.begin_at[1].blocks 
    		 		+ " blocks away"
    		 	);
    		 	start2.text(
    		 		data.begin_at[2].slots
    		 		+ " bikes at "
    		 		+ data.begin_at[2].name
    		 		+ ", " 
    		 		+ data.begin_at[2].blocks 
    		 		+ " blocks away"
    		 	);
    		 	finish0.text(
    		 		data.finish_at[0].slots
    		 		+ " docks at "
    		 		+ data.finish_at[0].name 
    		 		+ ", " 
    		 		+ data.finish_at[0].blocks 
    		 		+ " blocks away"
    		 	);
    		 	finish1.text(
    		 		data.finish_at[1].slots
    		 		+ " docks at "
    		 		+ data.finish_at[1].name
    		 		+ ", " 
    		 		+ data.finish_at[1].blocks
    		 		+ " blocks away"
    		 	);
    		 	finish2.text(
    		 		data.finish_at[2].slots
    		 		+ " docks at "
    		 		+(data.finish_at[2].name) 
    		 		+ ( ", " )
    		 		+ ( data.finish_at[2].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	if(tooFar > 20) {
    		 		warning.text("That's pretty far bro, maybe you shouldn't bike");
    		 	}

    		 }
    	);*/ 

	});


})();