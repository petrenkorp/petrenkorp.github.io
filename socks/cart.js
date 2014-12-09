$(document).ready(function() {loadCart(catalog, localStorage);});
$(document).ready(function() {estimateShipping();});

function loadCart(list, localStorage) {
	$("#cart").children().remove();
	
	var cartHeader = "<div id='cartHeader'>";
	cartHeader += "<p class='cartData'># OF ITEMS: <span id='totalSocks'></span></p>";
	cartHeader += "<p class='cartData'>TOTAL PRICE: $<span id='totalCost'></span></p>";
	cartHeader += "<p class='cartData'>SHIPPING ESTIMATE: $<span id='shippingEstimate'>--.--</span></p>";
	cartHeader += "<button>PROCEED TO CHECKOUT</button>";
	cartHeader += "</div>";
	$("#cart").prepend($(cartHeader));
	
	
	for (element in localStorage) {
		
		var newNode = $("<div/>", {
			class: "cartRow",
			id: element
		});
		
		var sockImage = $("<img/>", {
			class: "cartImage",
			src: list[element].image
		});
		
		var cartText = "<div class='cartText'>";
		cartText += "<p class='cartData'><span class='sockLabel'>NAME:</span> " + list[element].name + "</p>";
		cartText += "<p class='cartData'><span class='sockLabel'>PRICE:</span> " + list[element].price + "</p>";
		cartText += "<p class='cartData'><span class='sockLabel'>QUANTITY:</span> " + localStorage[element] + "</p>";
		cartText += "<button onclick='deleteCartItem(this)'>Remove From Cart</button>";
		cartText += "</div>";
		
		newNode.append(sockImage);
		newNode.append(cartText);
		
		$("#cart").append(newNode);
	}
	
	calculateCart(list, localStorage);
	
}

function deleteCartItem(button){
	localStorage.removeItem($(button).parents(".cartRow").attr("id"));
	$(button).parents(".cartRow").remove();
	calculateCart(catalog, localStorage);
}

function calculateCart(list, localStorage) {
	var totalCost = 0;
	var totalSocks = 0;
	var shippingCost = estimateShipping();
	
	for (element in localStorage) {
		totalCost += parseFloat(list[element].price * localStorage[element]);
		totalSocks += parseInt(localStorage[element]);
	}
	
	if (!shippingCost.isNAN) {
		totalCost += shippingCost;
	}
	
	$("#shippingEstimate").html(shippingCost);
	$("#totalCost").html(totalCost);
	$("#totalSocks").html(totalSocks);
}


function estimateShipping() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			geocoder.geocode({"latLng": latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					for (component in results[0].address_components) {
						console.log(component);
						if ($.inArray("country", component.types) >= 0) {
							switch (component.long_name) {
								case "Canada" :
									return 5.00;
									break;
								case "United States" :
									return 10.00;
									break;
								default:
									return 20.00;
									break;
							}
						} 
					}
				}
			});
		});
	}
	return "--.--";
}





var catalog = [
	{
		id: 0,
		name: "Sock 101: Intro to Sock",
		image: "res/0001.jpg",
		price: 2.00,
		description: "The basic sock - ideal for the sock-wearing beginner, or those afraid of achieving their destiny. Cotton.",
		inStock: true,
	},
	{
		id: 1,
		name: "Professor Socklington",
		image: "res/0002.jpg",
		price: 8.99,
		description: "A debonair sock for the dapper professor in every family - garish, but, you know, in an old-fashioned way. Wool.",
		inStock: true,
	},
	{
		id: 2,
		name: "Zany Patrol",
		image: "res/0003.jpg",
		price: 8.99,
		description: "A wacky sock for the goofy comedian in every family - garish, but, you know, in an ironic way. Wool.",
		inStock: true,
	},
	{
		id: 3,
		name: "The Hacker",
		image: "res/0004.jpg",
		price: 12.00,
		description: "Aerodynamic, stealthy, and loaded with biofeedback mechanisms - this is the SR-71 Blackbird of tactical footgear deployments. Cotton.",
		inStock: true,
	},
	{
		id: 4,
		name: "The Deity",
		image: "res/0005.jpg",
		price: 777.77,
		description: "A pair of socks that imbues the wearer with omnipotence, omniscience, and divine grace. Cotton/polyester blend.",
		inStock: false,
	},
	{
		id: 5,
		name: "The Old Sock",
		image: "res/0006.jpg",
		price: 1.50,
		description: "Classic. Vintage-inspired. New skin for the old ceremony. Hyper-allergenic.",
		inStock: true,
	},
];