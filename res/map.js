var map;
var placesArray;

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
		
		
		
		
		var input = document.getElementById('pac-input');
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		var searchBox = new google.maps.places.SearchBox(input);
		
		
		
		google.maps.event.addListener(searchBox, 'places_changed', function() {
		
			var places = searchBox.getPlaces();
			//console.log(places);
			if (places.length == 0) {
				return;
			}
			var latLong = new google.maps.LatLng(places[0].geometry.location.k, places[0].geometry.location.D);
			map.panTo(latLong);
			map.setZoom(10);
			
			//displayNearestPolluters(latLong, 10);
			
		});
		
		
		
		
		
		
		
		
		
		
		
		
		google.maps.event.addListenerOnce(map, 'idle', function(){
			getMyLocation();
		});
	
	}

	
	
	google.maps.event.addDomListener(window, 'load', initializeMap);
	
	
	
})();

function getPlaces(location, radius) {
		
	placesArray = [];
	var markersArray = [];
	
	poller.fetch(location.k, location.D, radius, function(data){
		placesArray = data;

		for (var place in placesArray) {
			var ll = new google.maps.LatLng(placesArray[place].Latitude, placesArray[place].Longitude);
			var marker = new google.maps.Marker({
				position: ll,
				map: map
			});
			
			marker.pollutionData = placesArray[place];
			google.maps.event.addListener(marker, 'click', function(){
				displayMarkerData(marker.pollutionData);
				displayDataWindow();
			});

			markersArray.push(marker);
		}
		
	});
	
}