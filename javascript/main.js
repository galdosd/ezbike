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
    		 	var result = $ ( '#result');
    		 	var tooFar = data.begin_at[0].blocks
    		 	result.text(
    		 		"begin at "
    		 		+(data.begin_at[0].name) 
    		 		+ ( " , " )
    		 		+ ( data.begin_at[0].blocks ) 
    		 		+ " blocks away"
    		 	);
    		 	if(tooFar > 20) {
    		 		result.text("maybe you shouldn't bike");
    		 	}

    		 }
    	); 

	});


})();
