(function(){

$(document).ready(function(){
  /*$('.bxslider').bxSlider({
  	minSlides: 1,
  	maxSlides: 1,
  	slideWidth: 350,
  	slideMargin: 10
	});*/

var go = $( '#go' );
var api = 'http://ezbike.xweb.service.cmwp.com/cgi-bin/report.pl?home_latitude=5.5&home_longitude=0&work_latitude=40.714&work_longitude=-73.989'

go.click(
	function( e ) {

		$.get(
			api
			, function( data ) {
  				
			});



	});
});


})();
