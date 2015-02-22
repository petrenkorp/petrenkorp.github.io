var myScroll;

$(document).ready(function() {

	$("#dataButton").click(function(){
		toggleDataWindow();
	});
	
	
	/*$("#myLocation").click(function(){
		getMyLocation();
	});*/
	
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
		scrollbars: true,
		mouseWheel: true
	});

	$(function() {      
      $("#dataWindow").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          	if (window.matchMedia('(max-width: 767px)')) {
				if (direction === 'left' && $("#dataWindow").css("left") == "0px") {
					toggleDataWindow();
				}
		  	}
        }
      });
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
			getPlaces(loc, true);
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
		.append("<h5>" + pollutionData.Company_Name + "</h5>")
		.append("<span>see all &#8629;</span>");
	
	/*title.find("h3").click(function(){
		map.panTo(new google.maps.LatLng(pollutionData.Latitude, pollutionData.Longitude));
		map.setZoom(12);
		toggleDataWindow();
	});*/


	$("#dataWindow").on('click', '#dataWindowTitle span',function(){
		displayNearestPolluters();
	});
	
	$("#dataWindowTitle").html(title.html());
	
	$("#dataList").html("");
	
	for (var x = 0, len = pollutionData.Pollutants.length; x < len; x++){
	
		var dataListItem = $("<div class='dataListItem pollutant'></div>");
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

		//toxicity lookup functionality
		var cas = pollutionData.Pollutants[x].CAS_Number;
		var url = toxLookup[cas];
		if ( url ) {
			dataListItem.append("<div class='dataListLearnMore'>Learn More</div><a href='" + url + "' target='_blank'><span></span></a>");
		}
		
		$("#dataList").append(dataListItem);

		//update active marker
		$.each(placesArray, function(key, val) {
			val.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
		});
		pollutionData.marker.setIcon('https://maps.gstatic.com/mapfiles/ms2/micons/blue-pushpin.png');
		
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
	
	$("#dataWindowTitle").html("<h3>Nearby Polluters</h3>");
	
	//var dataList = $("#dataList");
	$("#dataList").html("");
	
	var count = 0;
	for (var x in placesArray) {
		count++;
		//if (count == 5) {return;}
		
		var dataListItem = $("<div class='dataListItem'></div>");
		dataListItem.append("<div class='dataListItemName'>" + placesArray[x].Company_Name + ": " + placesArray[x].Facility_Name + " <i>(" + parseFloat(placesArray[x].Distance, 10).toFixed(2) + "km)</i> </div>");

		(function(_place) {
			dataListItem.click(function(){
				displayMarkerData(_place);
				map.panTo(new google.maps.LatLng(_place.Latitude, _place.Longitude));
				map.setZoom(12);
			});
		})(placesArray[x]);
		
		$("#dataList").append(dataListItem);
		
	}
	
	resetIScroll();
}
	
	
	


	
