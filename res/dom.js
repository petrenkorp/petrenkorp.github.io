$(document).ready(function() {

	$("#dataButton").click(function(){
		displayDataWindow();
		
	});
	
	
	$("#myLocation").click(function(){
		getMyLocation();
	});
	
	
});

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			getPlaces(loc, 10);
			map.panTo(loc);
			map.setZoom(10);
		}, function(error){
			//nah
		});
	} else {
		//nah
	}
}

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

function hideDataWindow() {
	if (window.matchMedia('(max-width: 767px)')) {
		$("#dataWindow").css("left", "-110%");
		$("#dataButton").css("visibility", "visible");
		$("#googleMap").off("mousedown");
	}
}





function displayMarkerData(pollutionData){

	$("#dataList").html("");
	
	var dataListHeader = $("<div id='dataListHeader'></div>");
	dataListHeader.append("<h3><a>" + pollutionData.Facility_Name + "</a></h3>")
		.append("<h5>" + pollutionData.Company_Name + "</h5>")
	dataListHeader.find("a").click(function(){
		map.panTo(new google.maps.LatLng(pollutionData.Latitude, pollutionData.Longitude));
		map.setZoom(10);
		hideDataWindow();
	});
	$("#dataList").append(dataListHeader);
	
	for (var x = 0, len = pollutionData.Pollutants.length; x < len; x++){
	
		var dataListItem = $("<div class='dataListItem'></div>");
		var listCount = [];
		
		dataListItem.append("<div class='dataListItemName'>" + pollutionData.Pollutants[x].Substance_Name_En + " (" + pollutionData.Pollutants[x].Units + ")</div>");
		
		if (pollutionData.Pollutants[x].Air_Emissions_Tot != null) {
			dataListItem.append("<div class='dataListItemAmount'>Air Emissions: " + pollutionData.Pollutants[x].Air_Emissions_Tot + "</div>");
			listCount.push(pollutionData.Pollutants[x].Air_Emissions_Tot);
		}
		if (pollutionData.Pollutants[x].Water_Releases_Tot != null) {
			dataListItem.append("<div class='dataListItemAmount'>Water Releases: " + pollutionData.Pollutants[x].Water_Releases_Tot + "</div>");
			listCount.push(pollutionData.Pollutants[x].Water_Releases_Tot);
		}
		if (pollutionData.Pollutants[x].Land_Releases_Tot != null) {
			dataListItem.append("<div class='dataListItemAmount'>Land Releases: " + pollutionData.Pollutants[x].Land_Releases_Tot + "</div>");
			listCount.push(pollutionData.Pollutants[x].Water_Releases_Tot);
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



function displayNearestPolluters(latLong, rad) {
	
	
	//get JSON list of 5 nearest polluters
	var results = poller.fetch(latLong.lng, latLong.lat, rad, function(data){
		var prevPage = $("#dataList");
		
		var dataList = $("#dataList");
		dataList.append("<h3>Five Nearest Polluters</h3>");
		
		for (var x = 0, len = results.len; x < len; x++) {
			var dataListItem = $("<div class='dataListItem'></div>");
			var total = 0;
			dataListItem.append("<div class='dataListItemName'>" + "</div>");
			dataListItem.click(function(){
				
			});
			
		}
	});
	
	
	
	
	
	
}