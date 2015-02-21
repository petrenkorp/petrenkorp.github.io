var poller;

poller = (function( $ ) {
	var maxItems = 50;
	
	var fetch = function( lat, lng, rad, callback ) {
		var paramObj = {
			'lat': lat,
			'lng': lng,
			'rad': rad,
			'maxItems': maxItems
		};
		var params = $.param( paramObj );

		$.ajax({
			url: 'http://wamp.globalnews.ca/content/hack/petrenkorp.github.io/services/polluters.php?' + params,
			dataType: 'jsonp'
		})
		.done( function( data ) {
			console.log( 'data fetched' );
			callback( data );
		})
		.fail( function( data ) {
			console.log( 'an error has occured: ' + data );
		});
	};
		
	return {
		fetch: fetch
	};
})( jQuery );

//poller.fetch( 43.6502840, -79.3843010, 10, output );

//function output( data ) {
//	console.log( data );
//}