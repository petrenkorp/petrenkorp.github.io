var setUpGame = function(gameDiv, tiles) {
	
	//variables to build the board - to set its size and to build the individual elements of the game tiles
	var boardHeight = gameDiv.style.height;
	var boardWidth = gameDiv.style.width;
	var board, row, tile, tileDiv;
	
	//variables to set up the socks - to choose the appropriate number of random colours, and make sure each is applied twice (for matching pairs)
	var colours = [];
	var shade;
	var matches = 0;
	
	//random colour generator I found - it wouldn't have been too tough to do, but then, it was even easier to find
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	
	//returns a random element in the colours[] array, provided it hasn't been chosen twice already
	function assignColour() {
		var picker = 0;
		
		while (!(colours[picker].uses < 2)) {
			picker = Math.floor(Math.random() * colours.length);
		}
		colours[picker].uses++;
		return colours[picker].colour;
	}
	
	
	
	//DRAG AND DROP functions
	var allowDrop = function(event) {
		event.preventDefault();
	};
	
	//on dragging, attach the dragged sock's colour and ID to the drag object
	var drag = function (event) {
		event.dataTransfer.setData("text/plain", event.target.dataset.colour + "" + event.target.dataset.id);
	};
	
	//on dropping
	var drop = function (event) {
		event.preventDefault();
		
		//slice up the attached data string - the first 7 chars are the dragged sock's colour, the rest is the dragged sock's ID
		var data = event.dataTransfer.getData("text/plain");
		var sockColour = data.slice(0, 7);
		var sockId = data.slice(7);
		
		//find the dragged sock's sockTile - we need to search for it because sometimes, the user will click-and-drag on an SVG path instead of the .sockTile DIV itself
		var target = $(event.target).attr("data-colour") ? $(event.target) : $(event.target).parents(".sockTile");
		
		//if the drag target and the drop target have the same colour and different IDs (that is, if they're a match), then...
		if (target.attr("data-colour") == sockColour && target.attr("data-id") != sockId) {
		
			//...create a node with the two-sock image, give it the same colour as the pair of socks just matched, and plug it in, being sure to remove the old socks
			var finishedImage = document.createElement("img");
			finishedImage.className = "svg";
			finishedImage.dataset.colour = sockColour;
			finishedImage.dataset.id = sockId;
			finishedImage.src = "socks.svg";
			
			target.children().remove();
			
			$(".sockTile[data-colour|=" + sockColour + "]").each(function(index, element){
				$(element).children().replaceWith(finishedImage);
			});
			
			//after changing the sock elements, call inline SVG to apply the colour of the newly-added two-sock image
			inlineSVG();
			
			//finally, add a notch to the "matches" variable, to calculate when the game has been won
			matches++;
			if (matches >= tiles * tiles / 2) {
				$("#sockGame").css("background", "#aaffaa");
			}
		}
		
	};
	
	
	//FINALLY, THE MAIN SHOW - the actual setting up of the board
	//first, set up the colours[] array to hold a 'deck' of socks - all parts of a colour pair, 
	for (var x = 0, size = tiles * tiles / 2; x < size; x++) {
		shade = {
			colour: getRandomColor(),
			uses: 0
		};
		colours[x] = shade;
	}
	
	//build the actual DOM objects that constitute the board
	for (var x = 0; x < tiles; x++) {
	
		//first, create rows to hold the tiles
		row = document.createElement("div");
		row.className = "sockRow";
		gameDiv.appendChild(row);
		
		for (var y = 0; y < tiles; y++) {
		
			//create the sockTile div, and assign it a colour and ID
			//the reason for the ID is to keep users from matching a sock with itself
			tileDiv = document.createElement("div");
			tileDiv.className = "sockTile";
			tileDiv.dataset.colour = assignColour();
			tileDiv.dataset.id = x * tiles + y;
			
			//set up the drag-and-drop functionality for the sock tile
			tileDiv.draggable = true;
			tileDiv.ondrop = drop;
			tileDiv.ondragstart = drag;
			tileDiv.ondragover = allowDrop;
			
			//add the SVG image to the tile
			tile = document.createElement("img");
			tile.src = "sock.svg";
			tile.className = "svg";
			
			//plug 
			tileDiv.appendChild(tile)
			row.appendChild(tileDiv);
		}
	}
	
	//next, plug the code of the SVG images inline - much nicer than copying and pasting a huge wad of SVG code-text in here
	inlineSVG();
	
}(document.getElementById("sockGame"), 6);

//function I found to grab the code from any .svg file linked to and plug it into the HTML of my page
//this is necessary to programmatically change the colour of each sock - it can't be done on a file
function inlineSVG() {
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);
			

		//finally, after the AJAX request is done, find the parts of the SVG sock we want to change the colour of, and do it
		}, 'xml').always(function(){
			$(".sockTile").each(function(index, element) {
				$(element).find(".path47").attr("fill", $(element).attr("data-colour"));
				$(element).find(".path45").attr("fill", $(element).attr("data-colour"));
			});
		});
		

	});
}
