(function(){

	$(document).ready(function(){

	/*useLo = $( '#useLo' );
	Go = $( '#go' );
	Go.on(
	'click'
	, function( e ) {
		
			// grab the task in the input field
			var start = $( '#start' ).val();


			if ( start == "" || start == " " ) {
				alert( 'where you at?' );
				e.stopPropagation();
				//done
				return;
			}

			var start = $( '#finish' ).val();


			if ( start == "" || start == " " ) {
				alert( 'where you at?' );
				e.stopPropagation();
				//done
				return;
			}

      	// if we made it here, then valid
      	var end2 = $( '.end2' );
      	end2.text( finalChoice2 );	
      }
      );
		
    */

    	jQuery.getJSON( "http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?"
    		+"home_latitude=5.5"
    		+"&home_longitude=0"
    		+"&work_latitude=40.714"
    		+"&work_longitude=-73.989",
    		 function ( data ) {
    		 	var start0 = $( '#start0' );
    		 	var start1 = $( '#start1' );
    		 	var start2 = $( '#start2' );
    		 	var end0 = $( '#end0' );
    		 	var end1 = $( '#end1' );
    		 	var end2 = $( '#end2' );
    		 	var tooFar = data.begin_at[0].blocks
    		 	var warning = $( '.warning');
    		 	start0.text(
    		 		data.begin_at[0].slots
    		 		+ " at "
    		 		+ data.begin_at[0].name  
    		 		+ ", " 
    		 		+ data.begin_at[0].blocks  
    		 		+ " blocks away"
    		 	);
    		 	start1.text(
    		 		data.begin_at[1].slots
    		 		+ " at "
    		 		+(data.begin_at[1].name) 
    		 		+ ( ", " )
    		 		+ ( data.begin_at[1].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	start2.text(
    		 		data.begin_at[2].slots
    		 		+ " at "
    		 		+(data.begin_at[2].name) 
    		 		+ ( ", " )
    		 		+ ( data.begin_at[2].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	end0.text(
    		 		"Begin at "
    		 		+(data.finish_at[0].name) 
    		 		+ ( ", " )
    		 		+ ( data.finish_at[0].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	end1.text(
    		 		"or "
    		 		+(data.finsh_at[0].name) 
    		 		+ ( ", " )
    		 		+ ( data.finsh_at[0].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	end2.text(
    		 		"or "
    		 		+(data.finish_at[0].name) 
    		 		+ ( ", " )
    		 		+ ( data.finish_at[0].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	if(tooFar > 20) {
    		 		warning.text("That's pretty far bro, maybe you shouldn't bike");
    		 	}

    		 }
    	); 

	});


})();
