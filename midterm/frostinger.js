var colour;

function setFrostingColour() {
	var r = document.getElementById("sliderR").value;
	var g = document.getElementById("sliderG").value;
	var b = document.getElementById("sliderB").value;
	colour = "rgb(" + r + ", " + g + ", " + b + ")";
	document.getElementById("frosting").setAttribute("fill", colour);
}

document.getElementById("submitFrosting").onclick = function() {
	document.location = "sprinklinator.html?" + colour;
}

document.getElementById("sliderR").onchange = setFrostingColour;
document.getElementById("sliderG").onchange = setFrostingColour;
document.getElementById("sliderB").onchange = setFrostingColour;
setFrostingColour();