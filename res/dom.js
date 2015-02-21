$(document).ready(function() {

	
	
	
	
	


	$("#dataButton").click(function(){
		displayDataWindow();
		
	});
	
	
	$("#myLocation").click(function(){
		getMyLocation();
	});
	
	
	
	
	
	
	
	function getMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
				map.panTo(loc);
				map.setZoom(10);
			}, function(error){
				//nah
			});
		} else {
			//nah
		}
	}
	
	
	
});

function displayDataWindow(){
	if (window.matchMedia('(max-width: 767px)')) {
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
	}
}

function displayMarkerData(pollutionData){

	$("#dataList").html("");
	
	var dataListHeader = $("<div id='dataListHeader'></div>");
	dataListHeader.append("<h3>" + pollutionData.Facility_Name + "</h3>")
		.append("<h5>" + pollutionData.Company_Name + "</h5>")
	$("#dataList").append(dataListHeader);
	
	for (var x = 0, len = pollutionData.Substances.length; x < len; x++){
	
		var dataListItem = $("<div class='dataListItem'></div>");
		var listCount = [];
		
		dataListItem.append("<div class='dataListItemName'>" + pollutionData.Substances[x].Substance_Name_En + " (" + pollutionData.Substances[x].Units + ")</div>");
		
		if (pollutionData.Substances[x].Air_Emissions_Tot != null) {
			dataListItem.append("<div class='dataListItemAmount'>Air Emissions: " + pollutionData.Substances[x].Air_Emissions_Tot + "</div>");
			listCount.push(pollutionData.Substances[x].Air_Emissions_Tot);
		}
		if (pollutionData.Substances[x].Water_Releases_Tot != null) {
			dataListItem.append("<div class='dataListItemAmount'>Water Releases: " + pollutionData.Substances[x].Water_Releases_Tot + "</div>");
			listCount.push(pollutionData.Substances[x].Water_Releases_Tot);
		}
		if (pollutionData.Substances[x].Land_Releases_Tot != null) {
			dataListItem.append("<div class='dataListItemAmount'>Land Releases: " + pollutionData.Substances[x].Land_Releases_Tot + "</div>");
			listCount.push(pollutionData.Substances[x].Water_Releases_Tot);
		}
		
		if (listCount.length > 0) {
			var total = 0;
			for (var y = 0, leny = listCount.length; y < leny; y++) {
				total += listCount[y];
			}
			dataListItem.append("<div class='dataListItemAmount dataListItemAmountTotal'>TOTAL: " + total + "</div>");
		}
		
		$("#dataList").append(dataListItem);
	}
	
	
}