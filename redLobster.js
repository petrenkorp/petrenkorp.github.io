var map = document.getElementById("googleMap");
var latlon;
var lobsterLocation;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var initializeMap = function() {
	var nowhere = new google.Maps.LatLng(0, 0);
	map = new google.maps.Map(map, {
		center: nowhere,
		zoom: 1,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
	});
	
	map.style.width = "100%";
	map.style.height = "100%";
	map.style.min-height = "200px";
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        map.innerHTML = "Red Lobster Locator is not supported by this browser.";
    }
}
function showPosition(position) {
	directionsDisplay = new google.maps.DirectionsRenderer();
    latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	//map.style.height = "400px";
	//map.style.width = "400px";
	
	/*
	map = new google.maps.Map(map, {
		center: latlon,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
	});
	*/
	
	directionsDisplay.setMap(map);
	
	var request = {location: latlon, 
					radius: 50000,
					name: "Red Lobster"
	};
	
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		lobsterLocation = results[0].geometry.location;
		displayRoute();
	}
}

function displayRoute() {
	var request = {
		origin: latlon,
		destination: lobsterLocation,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}
	
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            map.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            map.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            map.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            map.innerHTML = "An unknown error occurred."
            break;
    }
}

window.onload = initializeMap;
document.getElementById("lobsterSearch").onclick = getLocation;