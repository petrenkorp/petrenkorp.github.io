var map = document.getElementById("googleMap");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        map.innerHTML = "Red Lobster Locator is not supported by this browser.";
    }
}
function showPosition(position) {
    var latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	map.style.height = "400px";
	map.style.width = "400px";

	map = new google.maps.Map(map, {
		center: latlon,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
	});
	
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({location: latlon, 
							radius: 50000,
							name: "Red Lobster"},
					callback);
}

function callback(results, status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		createMarker(results[0]);
	}
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

document.getElementById("lobsterSearch").onclick = getLocation;