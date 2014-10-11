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

	map = new google.maps.Map(document.getElementById(map, {
		center: latlon,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL},
	}));
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

document.getElementById("lobsterSearch").onclick = getPosition;