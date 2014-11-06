function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
	} else {
		map.innerHTML = "Cupcake Praise Heaper is not supported by this browser.";
	}
}

function locationError(error) {
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

function locationSuccess(position) {
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var locationString;
	
	
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				locationString = results[2].address_components[0].short_name;
				displayLocation(locationString);
			}
		}
	});
	
}

function displayLocation(words) {
	document.getElementById("praise").innerHTML = '"Better than any cupcakes in ' + words + '."';
}

window.onload = getLocation;