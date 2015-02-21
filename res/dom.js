$(document).ready(function() {

	$("#dataButton").click(function(){
		
		if ($("#dataWindow").css("left") == "0px") {			
			$("#googleMap").off("mousedown");
		} 
		else {
			$("#dataButton").css("visibility", "hidden");
			$("#dataWindow").css("left", "0px");
			
			$("#googleMap").on("mousedown", function() {
				$("#dataWindow").css("left", "-110%");
				$("#dataButton").css("visibility", "visible");
			});
		}
	});
	
	
	$("#myLocation").click(function(){
		getMyLocation();
	});
	
	function getMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
				console.log(map);
				map.setCenter(loc);
				map.setZoom(10);
			}, function(error){
				//nah
			});
		} else {
			//nah
		}
	}
	
});