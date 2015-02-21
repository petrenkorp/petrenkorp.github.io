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
		
		
		function getPlaces() {
		
			//placeholder data
			placesArray = [];
			for (var x = 0; x < 10; x++) {
				placesArray.push(
					{
						Id : "0000" + x,
						Company_Name : "Acme Inc.",
						Facility_Name : "Garbage Factory",
						City : "Moose Lick",
						Province : "XX",
						Latitude : 62 - x,
						Longitude : -96 - x,
						Substances : [
							{
								Substance_Name_En : "Noxious Ooze",
								Units : "kg",
								Air_Emissions_Tot : 4244 + x,
								Water_Releases_Tot : 55 + x,
								Land_Releases_Tot : 2 + x
							},
							{
								Substance_Name_En : "Viscous Goo",
								Units : "tonnes",
								Air_Emissions_Tot : 52 + x,
								Water_Releases_Tot : 662 + x,
								Land_Releases_Tot : 99 + x
							}
						],
					});
			}
			
		}
		
		
		
		
		
	google.maps.event.addListenerOnce(map, 'idle', function(){
	
		var markersArray = [];
	
		getPlaces();
		
		for (var x = 0, len = placesArray.length; x < len; x++) {
			var ll = new google.maps.LatLng(placesArray[x].Latitude, placesArray[x].Longitude);
			var marker = new google.maps.Marker({
				position: ll,
				map: map
			});
			
			marker.pollutionData = placesArray[x];
			google.maps.event.addListener(marker, 'click', function(){
				displayMarkerData(marker.pollutionData);
				displayDataWindow();
			});

			markersArray.push(marker);
		}	
	});

		
		
	}

	
	
	google.maps.event.addDomListener(window, 'load', initializeMap);
	
	
	
})();