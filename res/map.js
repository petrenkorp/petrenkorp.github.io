var map;
var latlon;
var lobsterLocation;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initializeMap() {

	document.getElementById("googleMap").style.height = "400px";
	document.getElementById("googleMap").style.width = "100%";
	
	var nowhere = new google.maps.LatLng(0, 0);
	map = new google.maps.Map(document.getElementById("googleMap"), {
		center: nowhere,
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
	});
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
            document.getElementById("googleMap").innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("googleMap").innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            document.getElementById("googleMap").innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("googleMap").innerHTML = "An unknown error occurred."
            break;
    }
}

google.maps.event.addDomListener(window, 'load', initializeMap);
document.getElementById("lobsterSearch").onclick = getLocation;