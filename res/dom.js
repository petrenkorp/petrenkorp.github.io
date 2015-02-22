var myScroll;

$(document).ready(function() {

	$("#dataButton").click(function(){
		toggleDataWindow();
	});
	
	
	$("#myLocation").click(function(){
		getMyLocation();
	});
	
	$("#dataWindow").on('transitionend webkitTransitionEnd oTransitionEnd', function () {
		if ($("#dataWindow").css("left") == "0px") {	
			$("#dataWindowToggleGlyph").addClass("glyphicon-triangle-left").removeClass("glyphicon-triangle-right");
		} else {
			$("#dataWindowToggleGlyph").addClass("glyphicon-triangle-right").removeClass("glyphicon-triangle-left");
		}
	});


	//setup iScroll 
	myScroll = new IScroll( '#dataListWrapper', {
		//disableMouse: true,
		eventPassthrough: 'horizontal',
		fadeScrollbars: true,
		scrollbars: true
	});
	
	
});

// reset iScroll
function resetIScroll() {
	myScroll.scrollTo( 0, 0, 0);
	setTimeout(function () {
		myScroll.refresh();
	}, 0);
}

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

function toggleDataWindow(){
	if (window.matchMedia('(max-width: 767px)')) {
		if ($("#dataWindow").css("left") == "0px") {	
			$("#dataWindow").css("left", "-110%");
			$("#googleMap").off("mousedown");
		} 
		else {
			$("#dataWindow").css("left", "0px");
			$("#googleMap").on("mousedown", function() {
				$("#dataWindow").css("left", "-110%");
			});
		}
		
	}
}



function displayMarkerData(pollutionData){

	var prevPage = $("#dataWindow").html();
	
	$("#dataWindowTitle").html("");
	var title = $("#dataWindowTitle");
	
	title.append("<h3>" + pollutionData.Facility_Name + "</h3>")
		.append("<h5>" + pollutionData.Company_Name + "</h5>");
	
	title.find("h3").click(function(){
		map.panTo(new google.maps.LatLng(pollutionData.Latitude, pollutionData.Longitude));
		map.setZoom(12);
		toggleDataWindow();
	});
	
	$("#dataWindowTitle").html(title.html());
	
	$("#dataList").html("");
	
	for (var x = 0, len = pollutionData.Pollutants.length; x < len; x++){
	
		var dataListItem = $("<div class='dataListItem'></div>");
		var listCount = [];
		
		dataListItem.append("<div class='dataListItemName'>" + pollutionData.Pollutants[x].Substance_Name_En + "</div>");
		
		if (pollutionData.Pollutants[x].Air_Emissions_Tot != "") {
			dataListItem.append("<div class='dataListItemAmount'>Air Emissions: " + pollutionData.Pollutants[x].Air_Emissions_Tot + ' ' + pollutionData.Pollutants[x].Units + "</div>");
			listCount.push(pollutionData.Pollutants[x].Air_Emissions_Tot);
		}
		if (pollutionData.Pollutants[x].Water_Releases_Tot != "") {
			dataListItem.append("<div class='dataListItemAmount'>Water Releases: " + pollutionData.Pollutants[x].Water_Releases_Tot + ' ' + pollutionData.Pollutants[x].Units + "</div>");
			listCount.push(pollutionData.Pollutants[x].Water_Releases_Tot);
		}
		if (pollutionData.Pollutants[x].Land_Releases_Tot != "") {
			dataListItem.append("<div class='dataListItemAmount'>Land Releases: " + pollutionData.Pollutants[x].Land_Releases_Tot + ' ' + pollutionData.Pollutants[x].Units + "</div>");
			listCount.push(pollutionData.Pollutants[x].Water_Releases_Tot);
		}
		
		if (listCount.length > 0) {
			var total = 0;
			for (var y = 0, leny = listCount.length; y < leny; y++) {
				total += listCount[y];
			}
			//dataListItem.append("<div class='dataListItemAmount dataListItemAmountTotal'>TOTAL: " + total + "</div>");
		}
		
		$("#dataList").append(dataListItem);
		
	}


	
	/*
	$("#dataWindow").prepend("<button class='backButton btn btn-default'><span id='dataWindowToggleGlyph' class='glyphicon glyphicon-triangle-left' aria-hidden='true'></span></button>");
	$("#dataList").children("button").click(function(){
		$("#dataWindow").html(prevPage);
	});
	*/
	
	resetIScroll();
	
}






function displayNearestPolluters() {
	
	$("#dataWindowTitle").html("<h3>Nearest Polluters</h3>");
	
	//var dataList = $("#dataList");
	$("#dataList").html("");
	
	var count = 0;
	for (var x in placesArray) {
		count++;
		//if (count == 5) {return;}
		
		var dataListItem = $("<div class='dataListItem'></div>");
		dataListItem.append("<div class='dataListItemName'>" + placesArray[x].Company_Name + ": " + placesArray[x].Facility_Name + " <i>(" + parseFloat(placesArray[x].Distance, 10).toFixed(2) + "km)</i> </div>");
		dataListItem.click(function(){
			displayMarkerData(placesArray[x]);
			map.panTo(new google.maps.LatLng(placesArray[x].Latitude, placesArray[x].Longitude));
			map.setZoom(12);
		});
		
		$("#dataList").append(dataListItem);
		
	}
	
	resetIScroll();
	
}
	
	
	


	
