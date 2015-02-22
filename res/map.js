var map;
var placesArray;
var markersArray;

(function() {

	function initializeMap() {
	
		markersArray = [];
	
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




        var input = document.getElementById('searchBox');
        var autocomplete = new google.maps.places.Autocomplete(input);
		
		google.maps.event.addListener(autocomplete, 'places_changed', function() {
		
			var places = searchBox.getPlaces();
			if (places.length == 0) {
				return;
			}
			var latLong = new google.maps.LatLng(places[0].geometry.location.k, places[0].geometry.location.D);
			getPlaces(latLong);
			map.panTo(latLong);
			map.setZoom(12);
			
			
		});
		
		
		google.maps.event.addListener(map, 'click', function(event) {
			getPlaces(event.latLng);
		});
		
		
		google.maps.event.addListenerOnce(map, 'idle', function(){
			getMyLocation();
		});
	
	}

	
	
	google.maps.event.addDomListener(window, 'load', initializeMap);
	
	
	
})();

function getPlaces(location) {

	placesArray = [];
	if (markersArray.length > 0) {
		for (var x = 0, len = markersArray.length; x < len; x++) {
			markersArray[x].setMap(null);
		}
	}
	markersArray = [];
	
	var radius = parseInt($("#radiusSelect").val());
	
	poller.fetch(location.k, location.D, radius, function(data){
	
		placesArray = data;

		for (var x in placesArray) {
			var ll = new google.maps.LatLng(placesArray[x].Latitude, placesArray[x].Longitude);
			var marker = new google.maps.Marker({
				position: ll,
				map: map
			});
		
			marker.pollutionData = placesArray[x];

			(function(_pollutionData) {
				google.maps.event.addListener(marker, 'click', function(){
					console.log(_pollutionData);
					displayMarkerData(_pollutionData);
					displayDataWindow();
				});
			})(marker.pollutionData);

			markersArray.push(marker);
		}
		
		displayNearestPolluters();
	});
	
}