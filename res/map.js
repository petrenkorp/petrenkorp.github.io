var map;

(function() {

function initializeMap() {
	var nowhere = new google.maps.LatLng(62.40, -96.75);
	map = new google.maps.Map(document.getElementById("googleMap"), {
		center: nowhere,
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		panControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		}
		
	});
	
	
	
	
	var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
	
	google.maps.event.addListener(searchBox, 'places_changed', function() {
	
		var places = searchBox.getPlaces();
		console.log(places);
		if (places.length == 0) {
			return;
		}
		map.panTo(new google.maps.LatLng(places[0].geometry.location.k, places[0].geometry.location.D));
		map.setZoom(10);
		
		
	});
	
	
	
	

}



	
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            //document.getElementById("googleMap").innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            //document.getElementById("googleMap").innerHTML = "An unknown error occurred.";
            break;
    }
}

google.maps.event.addDomListener(window, 'load', initializeMap);
})();