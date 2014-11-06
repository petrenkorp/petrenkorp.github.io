function cupcakeClick(event) {
	var canvas = document.getElementById("cupcakeCanvas");
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;
	drawSprinkle(x, y);
	printSprinkle(x, y);
}

function drawSprinkle(x, y) {
	var angle = document.getElementById("sprinkleAngle").value;
	var size = document.getElementById("sprinkleSize").value;
	
	var r = document.getElementById("sliderR2").value;
	var g = document.getElementById("sliderG2").value;
	var b = document.getElementById("sliderB2").value;
	
	var c = document.getElementById("cupcakeCanvas").getContext("2d");
	c.save();
	c.beginPath();
	c.lineWidth = Math.floor(size / 3);
	c.lineCap = "round";
	c.strokeStyle = "rgb(" + r + ", " + g + ", " + b + ")";
	c.moveTo(x - size * Math.cos(angle / 100), y - size * Math.sin(angle / 100));
	c.lineTo(x + size * Math.cos(angle / 100), y + size * Math.sin(angle / 100));
	c.stroke();
	c.restore();
}

function updateSampleSprinkle() {
	var angle = document.getElementById("sprinkleAngle").value;
	var size = document.getElementById("sprinkleSize").value;
	var x = document.getElementById("sprinkleSample").offsetWidth;
	var y = document.getElementById("sprinkleSample").offsetHeight;
	var r = document.getElementById("sliderR2").value;
	var g = document.getElementById("sliderG2").value;
	var b = document.getElementById("sliderB2").value;
	
	var c = document.getElementById("sprinkleSample").getContext("2d");
	c.save();
	c.clearRect(0, 0, x, y);
	c.beginPath();
	c.lineWidth = Math.floor(size / 3);
	c.lineCap = "round";
	c.strokeStyle = "rgb(" + r + ", " + g + ", " + b + ")";
	c.moveTo(x / 2 - size * Math.cos(angle / 100) - 2, y / 2 - size * Math.sin(angle / 100) - 2);
	c.lineTo(x / 2 + size * Math.cos(angle / 100) - 2, y / 2 + size * Math.sin(angle / 100) - 2);
	c.stroke();
	c.restore();
}

function printSprinkle(x, y) {
	var angle = document.getElementById("sprinkleAngle").value;
	var size = document.getElementById("sprinkleSize").value;
	var r = document.getElementById("sliderR2").value;
	var g = document.getElementById("sliderG2").value;
	var b = document.getElementById("sliderB2").value;
	
	var sprinkleString = "\n(" + x + ", " + y + "): " +
		size + " gauge sprinkle, " + Math.round((angle / 100) * 180 / Math.PI) + " degrees, RGB (" + 
		r + ", " + g + ", " + b + ")";
	document.getElementById("sprinkleText").innerHTML += sprinkleString;
	
}

function drawCupcake() {
	var c = document.getElementById("cupcakeCanvas").getContext("2d");
	var x = document.getElementById("cupcakeCanvas").width / 2;
	var y = document.getElementById("cupcakeCanvas").height / 2;
	var r = (x <= y) ? x * 4 / 5 : y * 4 / 5; 
	var colour = window.location.search.substring(1);
	colour = colour.replace(/%20/g, " ");
	
	c.save();
	c.beginPath();
	c.arc(x, y, r, 0, 2 * Math.PI);
	c.fillStyle = colour;
	c.fill();
	c.restore();
}

document.getElementById("submitSprinkles").onclick = function() {
	document.location = "index.html?order=received";
}

document.getElementById("cupcakeCanvas").onclick = cupcakeClick;
document.getElementById("sprinkleSize").onchange = updateSampleSprinkle;
document.getElementById("sprinkleAngle").onchange = updateSampleSprinkle;
document.getElementById("sliderR2").onchange = updateSampleSprinkle;
document.getElementById("sliderG2").onchange = updateSampleSprinkle;
document.getElementById("sliderB2").onchange = updateSampleSprinkle;

updateSampleSprinkle();
drawCupcake();

