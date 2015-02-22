var map;
var placesArray;
var markersArray;


(function() {

	function HomeControl(controlDiv, map) {

	  // Set CSS for the control border
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = '#fff';
	  controlUI.style.border = '2px solid #fff';
	  controlUI.style.borderRadius = '3px';
	  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.marginBottom = '40px';
	  controlUI.style.marginLeft = '-40px';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to geolocate current position';
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control interior
	  var controlText = document.createElement('div');
	  controlText.style.color = 'rgb(25,25,25)';
	  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	  controlText.style.fontSize = '16px';
	  controlText.style.lineHeight = '38px';
	  controlText.style.paddingLeft = '10px';
	  controlText.style.paddingRight = '10px';
	  //controlText.innerHTML = '<img src="res/geolocate-icon.png" />';
	  controlText.innerHTML = '<span class="glyphicon glyphicon-home" aria-hidden="true"></span>';
	  controlUI.appendChild(controlText);

	  google.maps.event.addDomListener(controlUI, 'click', function() {
	    getMyLocation();
	  });

	}

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

		// geolocate button
		var homeControlDiv = document.createElement('div');
  		var homeControl = new HomeControl(homeControlDiv, map);
 		homeControlDiv.index = 1;
  		map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(homeControlDiv);

        //var input = document.getElementById('searchBox');
        //var autocomplete = new google.maps.places.Autocomplete(input);
        var input = document.getElementById('pac-input');
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		var searchBox = new google.maps.places.SearchBox(input);
		
		google.maps.event.addListener(searchBox, 'places_changed', function() {
		
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
	
	var radius = 10; //parseInt($("#radiusSelect").val());
	
	poller.fetch(location.k, location.D, radius, function(data){
	
		placesArray = data;

		for (var x in placesArray) {
			var ll = new google.maps.LatLng(placesArray[x].Latitude, placesArray[x].Longitude);
			var marker = new google.maps.Marker({
				icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
				position: ll,
				map: map
			});
		
			placesArray[x]['marker'] = marker;
			marker.pollutionData = placesArray[x];
			

			(function(_pollutionData) {
				google.maps.event.addListener(marker, 'click', function(){
					//console.log(_pollutionData);
					displayMarkerData(_pollutionData);
					toggleDataWindow();
				});
			})(marker.pollutionData);

			markersArray.push(marker);
		}
		
		displayNearestPolluters();
	});
	
}