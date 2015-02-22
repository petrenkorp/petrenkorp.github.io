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
			getPlaces(loc);
			map.panTo(loc);
			map.setZoom(12);
			displayNearestPolluters();
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

	var prevPage = $("#dataWindow").html();
	
	var title = $("#dataWindowTitle");
	
	title.html("");
	title.append("<h3>" + pollutionData.Facility_Name + "</h3>")
		.append("<h5>" + pollutionData.Company_Name + "</h5>");
	
	title.find("h3").click(function(){
		map.panTo(new google.maps.LatLng(pollutionData.Latitude, pollutionData.Longitude));
		map.setZoom(12);
		hideDataWindow();
	});
	
	$("#dataWindowTitle").html(title.html());
	
	$("#dataList").html("");
	
	for (var x = 0, len = pollutionData.Pollutants.length; x < len; x++){
	
		var dataListItem = $("<div class='dataListItem'></div>");
		var listCount = [];
		
		dataListItem.append("<div class='dataListItemName'>" + pollutionData.Pollutants[x].Substance_Name_En + " (" + pollutionData.Pollutants[x].Units + ")</div>");
		
		if (pollutionData.Pollutants[x].Air_Emissions_Tot != "") {
			dataListItem.append("<div class='dataListItemAmount'>Air Emissions: " + pollutionData.Pollutants[x].Air_Emissions_Tot + "</div>");
			listCount.push(pollutionData.Pollutants[x].Air_Emissions_Tot);
		}
		if (pollutionData.Pollutants[x].Water_Releases_Tot != "") {
			dataListItem.append("<div class='dataListItemAmount'>Water Releases: " + pollutionData.Pollutants[x].Water_Releases_Tot + "</div>");
			listCount.push(pollutionData.Pollutants[x].Water_Releases_Tot);
		}
		if (pollutionData.Pollutants[x].Land_Releases_Tot != "") {
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
	
	$("#dataList").append("<button class='btn btn-default'><-- BACK</button>");
	$("#dataList").children("button").click(function(){
		$("#dataWindow").html(prevPage);
	});
	
	
}






function displayNearestPolluters() {
	
	$("#dataWindowTitle").html("<h3>Five Nearest Polluters</h3>");
	
	var dataList = $("#dataList");
	dataList.html("");
	
	for (var x = 0, len = Math.min(Object.keys(placesArray).length, 5); x < len; x++) {
		console.log("woo!");
		var dataListItem = $("<div class='dataListItem'></div>");
		//var total = 0;
		dataListItem.append("<div class='dataListItemName'>" + placesArray[x].Company_Name + ": " + placesArray[x].Facility_Name + "</div>");
		//dataListItem.append("<div class='dataListItemAmount'>Total Pollution: </div>);"
		dataListItem.click(function(){
			displayMarkerData(placesArray[x]);
			map.panTo(new google.maps.LatLng(placesArray[x].Latitude, placesArray[x].Longitude));
			map.setZoom(12);
		});
		
		dataList.append(dataListItem);
	}
	
	
	
}
	
	
	
	
	
