$(document).ready(function() {loadCatalog(catalog)});

function loadCatalog(list) {
	list.forEach(function(element) {
		var sock, sockImage, sockText;
		
		sock = $("<div/>", {
			id: element.id,
			class: "catalogRow " + element.inStock
		});
		
		sockImage = $("<img/>", {
			class: "catalogImage",
			src: element.image
		});
		
		sockText = "<div class='catalogText'>";
		sockText += "<p class='sockName'><span class='sockLabel'>NAME:</span> " + element.name + "</p>";
		sockText += "<p class='sockPrice'><span class='sockLabel'>PRICE:</span> " + element.price + "</p>";
		sockText += "<p class='sockDescription'>" + element.description + "</p>";
		if (element.inStock) {
			sockText += "<p class='cartButton'><span class='sockLabel'>QUANTITY: </span><input type='number' min='1' id='quantity' /><button class='addToCart' onclick='addToCart(event)'>ADD TO CART</button></p>";
		} else {
			sockText += "<p>ITEM CURRENTLY OUT OF STOCK. :(</p>";
		}
		sockText += "</div>";
		
		sock.append(sockImage);
		sock.append(sockText);
		$("#catalog").append(sock);
	});
}

var addToCart = function(event) {
	var sock = $(event.target).parents(".catalogRow");
	localStorage[sock.attr("id")] = sock.find("#quantity").val();
	sock.addClass("bought");
	sock.find(".catalogText").append("<p>Added to cart - thank you!</p>");
	sock.find(".catalogText").append("<div><a href='cart.html'><button>View My Cart</button></a></div>");
};


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