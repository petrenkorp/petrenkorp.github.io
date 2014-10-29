/*
 *	MAYOR'S QUEST
 *	by Edward Petrenko
 *	
 *
 */


var WIDTH = 40;
var HEIGHT = 22;
var tileSize = Math.floor(document.getElementById("gameMap").offsetHeight / 10); //MAKE THIS MULTIPLES OF 20, TO PREVENT SKEWING
var tileHeight = Math.floor(document.getElementById("gameMap").offsetHeight / 10);
var tileWidth = Math.floor(document.getElementById("gameMap").offsetWidth / 10);
var gameWindowHeight = tileSize * 10;
var gameWindowWidth = tileSize * 10;

var levelBeingPlayed = 0;
var levelMapInUse = new Array(WIDTH);
for (var x = 0; x < WIDTH; x++) {
	levelMapInUse[x] = new Array(HEIGHT);
}
var levelDiamondsNeeded = 0;
var levelDiamondsObtained = 0;
var playerX, playerY, mapX, mapY;
var animationCount = 0;
var crackTumbleCount = 0;
var animationTimer, objectsTimer, crackHighTimer, newsTimer;
var dead = false;
var won = false;
var crackHigh = false;
var flies = [];
var amoebaList = [];
var boomList = [];
var sound = false;

var picEmpty = new Image(tileWidth, tileHeight);
picEmpty.src = "mayorsQuestRes/empty.png";
var picDirt = new Image(tileWidth, tileHeight);
picDirt.src = "mayorsQuestRes/dirt.png";
var picWall = new Image(tileWidth, tileHeight);
picWall.src = "mayorsQuestRes/wall.png";
var picRock = new Image(tileWidth, tileHeight);
picRock.src = "mayorsQuestRes/rock.png";
var picFallingRock = new Image(tileWidth, tileHeight);
picFallingRock.src = "mayorsQuestRes/fallingrock.png";
var picDiamond = new Image(tileWidth, tileHeight);
picDiamond.src = "mayorsQuestRes/diamond.png";
var picFallingDiamond = new Image(tileWidth, tileHeight);
picFallingDiamond.src = "mayorsQuestRes/fallingdiamond.png";
var picAmoeba = new Image(tileWidth, tileHeight);
picAmoeba.src = "mayorsQuestRes/amoeba.png";
var picFirefly = new Image(tileWidth, tileHeight);
picFirefly.src = "mayorsQuestRes/firefly.png";
var picButterfly = new Image(tileWidth, tileHeight);
picButterfly.src = "mayorsQuestRes/butterfly.png";
var picExit = new Image(tileWidth, tileHeight);
picExit.src = "mayorsQuestRes/exit.png";
var picPlayer = new Image(tileWidth, tileHeight);
picPlayer.src = "mayorsQuestRes/player.png";
var picExplosion = new Image(tileWidth, tileHeight);
picExplosion.src = "mayorsQuestRes/explosion.png";

var picPlayer3 = new Image(tileWidth, tileHeight);
picPlayer3.src = "mayorsQuestRes/player3.png";
var picAmoeba3 = new Image(tileWidth, tileHeight);
picAmoeba3.src = "mayorsQuestRes/amoeba3.png";
var picFallingRock2 = new Image(tileWidth, tileHeight);
picFallingRock2.src = "mayorsQuestRes/fallingrock2.png";
var picFallingRock3 = new Image(tileWidth, tileHeight);
picFallingRock3.src = "mayorsQuestRes/fallingrock3.png";
var picFallingRock4 = new Image(tileWidth, tileHeight);
picFallingRock4.src = "mayorsQuestRes/fallingrock4.png";
var picFallingDiamond2 = new Image(tileWidth, tileHeight);
picFallingDiamond2.src = "mayorsQuestRes/fallingdiamond2.png";
var picFallingDiamond3 = new Image(tileWidth, tileHeight);
picFallingDiamond3.src = "mayorsQuestRes/fallingdiamond3.png";
var picFallingDiamond4 = new Image(tileWidth, tileHeight);
picFallingDiamond4.src = "mayorsQuestRes/fallingdiamond4.png";
var tumble2 = new Image(tileWidth, tileHeight);
tumble2.src = "mayorsQuestRes/tumble2.png";
var tumble3 = new Image(tileWidth, tileHeight);
tumble3.src = "mayorsQuestRes/tumble3.png";
var tumble4 = new Image(tileWidth, tileHeight);
tumble4.src = "mayorsQuestRes/tumble4.png";

var picDeathLabel = new Image(tileSize * 6, tileSize * 7);
picDeathLabel.src = "mayorsQuestRes/deathlabel.jpg";
var picWinLabel = new Image(tileSize * 6, tileSize * 7);
picWinLabel.src = "mayorsQuestRes/winlabel.jpg";

/*
var picEmpty = new Image(tileSize, tileSize);
picEmpty.src = "mayorsQuestRes/empty.png";
var picDirt = new Image(tileSize, tileSize);
picDirt.src = "mayorsQuestRes/dirt.png";
var picWall = new Image(tileSize, tileSize);
picWall.src = "mayorsQuestRes/wall.png";
var picRock = new Image(tileSize, tileSize);
picRock.src = "mayorsQuestRes/rock.png";
var picFallingRock = new Image(tileSize, tileSize);
picFallingRock.src = "mayorsQuestRes/fallingrock.png";
var picDiamond = new Image(tileSize, tileSize);
picDiamond.src = "mayorsQuestRes/diamond.png";
var picFallingDiamond = new Image(tileSize, tileSize);
picFallingDiamond.src = "mayorsQuestRes/fallingdiamond.png";
var picAmoeba = new Image(tileSize, tileSize);
picAmoeba.src = "mayorsQuestRes/amoeba.png";
var picFirefly = new Image(tileSize, tileSize);
picFirefly.src = "mayorsQuestRes/firefly.png";
var picButterfly = new Image(tileSize, tileSize);
picButterfly.src = "mayorsQuestRes/butterfly.png";
var picExit = new Image(tileSize, tileSize);
picExit.src = "mayorsQuestRes/exit.png";
var picPlayer = new Image(tileSize, tileSize);
picPlayer.src = "mayorsQuestRes/player.png";
var picExplosion = new Image(tileSize, tileSize);
picExplosion.src = "mayorsQuestRes/explosion.png";

var picPlayer3 = new Image(tileSize, tileSize);
picPlayer3.src = "mayorsQuestRes/player3.png";
var picAmoeba3 = new Image(tileSize, tileSize);
picAmoeba3.src = "mayorsQuestRes/amoeba3.png";
var picFallingRock2 = new Image(tileSize, tileSize);
picFallingRock2.src = "mayorsQuestRes/fallingrock2.png";
var picFallingRock3 = new Image(tileSize, tileSize);
picFallingRock3.src = "mayorsQuestRes/fallingrock3.png";
var picFallingRock4 = new Image(tileSize, tileSize);
picFallingRock4.src = "mayorsQuestRes/fallingrock4.png";
var picFallingDiamond2 = new Image(tileSize, tileSize);
picFallingDiamond2.src = "mayorsQuestRes/fallingdiamond2.png";
var picFallingDiamond3 = new Image(tileSize, tileSize);
picFallingDiamond3.src = "mayorsQuestRes/fallingdiamond3.png";
var picFallingDiamond4 = new Image(tileSize, tileSize);
picFallingDiamond4.src = "mayorsQuestRes/fallingdiamond4.png";
var tumble2 = new Image(tileSize, tileSize);
tumble2.src = "mayorsQuestRes/tumble2.png";
var tumble3 = new Image(tileSize, tileSize);
tumble3.src = "mayorsQuestRes/tumble3.png";
var tumble4 = new Image(tileSize, tileSize);
tumble4.src = "mayorsQuestRes/tumble4.png";

var picDeathLabel = new Image(353, 418);
picDeathLabel.src = "mayorsQuestRes/deathlabel.jpg";
var picWinLabel = new Image(353, 418);
picWinLabel.src = "mayorsQuestRes/winlabel.jpg";
//var banner = new Image(gameWindowWidth, 100);
//banner.src = "mayorsQuestRes/banner.png";
*/

var news = new Array(
	"Streetcars kill 5 taxpayers in fancy downtown neighbourhood",
	"Mayor donates own racing car bed to help kids in need",
	"Armed cyclists steal $10M from taxpayer coffers",
	"Mayor joins Raptors for free throw, dunks on all of them",
	"Mayor's new 'naptime' initiative saves taxpayers a bundle",
	"Slow heat death of universe halts as taxes reach all-time low",
	"All Toronto sports teams win titles thanks to mayoral support",
	"Toronto muckraker arrested for diddling - mayor's tip key, say cops",
	"Thousands flock to 'Virgin Mary' sweat stain on mayor's shirt",
	"'Mayor chic' sweeps Milan - t-shirts in swimming pools 'in'",
	"SETI to include 'Chris Farley/The Mayor' JPEGs in next probe",
	"Mayor's football team wins again - global Gatorade shortage imminent",
	"Mayor to scrap all taxes & services, convert city to colossal Costco",
	"Study finds ecological catastrophe unavoidable due to cars being cool",
	"Construction begins on combination casino/airport/ferris wheel",
	"Scarborough subway pays for self w/ treasure found during excavation",
	"Mayor wins Pulitzer prize for 'jabronis' remark at council",
	"Ryan Gosling to get 'handsome surgery' to play Mayor in new film",
	"First Nations burial ground destroyed to make way for bike lane",
	"Philosophy prof: 'next Gandhi' could possibly be killed by streetcar",
	"Mayor explains 'video rant': 'I was playing Wii - winning, too'",
	"Study finds mayor's job impossible to do before noon anyways",
	"Football team coached by mayor wins Big Game thanks to canine QB",
	"Council: there's no law that says a mayor can't break laws",
	"Mayor issues statement: 'Michael, keep an eye on the sauce'",
	"Massive media maggot hive discovered under Nathan Phillips Square",
	"New course offered at Don Bosco CHS to teach loyalty",
	"Mayor's LazerQuest nickname, 'CrackShot420,' retired nationwide",
	"Mayor institutes Basketball Shorts Fridays for all city staff",
	"Mayor balances budget by cleverly mispelling 'dollars'",
	"Mayor's witty banter helps charity function raise record amount",
	"Mayor inks endorsement deal with TapOut",
	"Mayor's extensive lobbying wins Toronto exclusive Baba Booey rights",
	"Mayor tackles huge spider off elderly councillor's back",
	"Mayor issues statement about Roadhouse: 'what a great darn flick'",
	"Mayor wins transit debate as elitist opponent gets stuck in toilet",
	"Mayor cuts school week to 4 days to pay to bring Maury taping to TO",
	"As per mayor's transit plan, Scarborough to get 4 Subway franchises",
	"Four Etobicoke drug dealers killed; streetcar tracks found at scene",
	"Mayor donates funds for 'Calvin Peeing' statues along St Clair tracks",
	"Mayor wins freestyle competition, credits 'here to stay / USA' rhyme",
	"Groundwork laid on Mayor's latest treehouse"
);

var TILE = {
	EMPTY: {img: picEmpty},
	DIRT: {img: picDirt},
	WALL: {img: picWall},
	ROCK: {img: picRock},
	FALLINGROCK: {img: picFallingRock},
	DIAMOND: {img: picDiamond},
	FALLINGDIAMOND: {img: picFallingDiamond},
	AMOEBA: {img: picAmoeba},
	FIREFLY: {img: picFirefly},
	BUTTERFLY: {img: picButterfly},
	EXIT: {img: picExit},
	PLAYER: {img: picPlayer},
	BOOM: {img: picExplosion}
};





//NOTE: THIS IS (HOPEFULLY) THE AJAX VERSION
//SWITCH TO THIS WHEN UPLOADING TO SERVER
/*
$.getJSON("levelmap.json", function(data) {
	levels = data;
});
*/


//loads in map data
var levelLoad = function (levelNumber) {

	//initialize the working map to blank
	for (var x = 0; x < levelMapInUse.length; x++) {
		for (var y = 0; y < levelMapInUse[x].length; y++) {
			levelMapInUse[x][y] = TILE.DIRT;
		}
	}
	
	var levelBeingLoaded = levelSet.level[levelNumber];
	
	//get the number of diamonds needed
	levelDiamondsNeeded = parseInt(levelBeingLoaded.diamonds);
	
	//doing this the worst way possible because this JSON file is being weird
	if (levelBeingLoaded.wall) {
		for (var i = 0; i < levelBeingLoaded.wall.length; i++) {
			levelMapInUse[parseInt(levelBeingLoaded.wall[i].x)][parseInt(levelBeingLoaded.wall[i].y)] = TILE.WALL;
		}
	}
	if (levelBeingLoaded.diamond) {
		for (var i = 0; i < levelBeingLoaded.diamond.length; i++) {
			levelMapInUse[parseInt(levelBeingLoaded.diamond[i].x)][parseInt(levelBeingLoaded.diamond[i].y)] = TILE.DIAMOND;
		}
	}
	if (levelBeingLoaded.rock) {
		for (var i = 0; i < levelBeingLoaded.rock.length; i++) {
			levelMapInUse[parseInt(levelBeingLoaded.rock[i].x)][parseInt(levelBeingLoaded.rock[i].y)] = TILE.ROCK;
		}
	}
	if (levelBeingLoaded.empty) { 
		for (var i = 0; i < levelBeingLoaded.empty.length; i++) {
			levelMapInUse[parseInt(levelBeingLoaded.empty[i].x)][parseInt(levelBeingLoaded.empty[i].y)] = TILE.EMPTY;
		}
	}
	if (levelBeingLoaded.amoeba) { 
		for (var i = 0; i < levelBeingLoaded.amoeba.length; i++) {
			levelMapInUse[parseInt(levelBeingLoaded.amoeba[i].x)][parseInt(levelBeingLoaded.amoeba[i].y)] = TILE.AMOEBA;
			var amoeba = { 
				x: parseInt(levelBeingLoaded.amoeba[i].x),
				y: parseInt(levelBeingLoaded.amoeba[i].y)
			};
			amoebaList.push(amoeba);
		}
	}
	if (levelBeingLoaded.butterfly) { 
		for (var i = 0; i < levelBeingLoaded.butterfly.length; i++) {
			levelMapInUse[parseInt(levelBeingLoaded.butterfly[i].x)][parseInt(levelBeingLoaded.butterfly[i].y)] = TILE.BUTTERFLY;
			var newFly = {
				x: parseInt(levelBeingLoaded.butterfly[i].x), 
				y: parseInt(levelBeingLoaded.butterfly[i].y),
				type: TILE.BUTTERFLY,
				direction: Math.floor(Math.random() * 4),
				movement: -1,
				scanned: false,
				killed: false
				};
			flies.push(newFly);
		}
	}
	if (levelBeingLoaded.firefly) { 
		if (levelBeingLoaded.firefly.length) {
			for (var i = 0; i < levelBeingLoaded.firefly.length; i++) {
				levelMapInUse[parseInt(levelBeingLoaded.firefly[i].x)][parseInt(levelBeingLoaded.firefly[i].y)] = TILE.FIREFLY;
				var newFly = {
					x: parseInt(levelBeingLoaded.firefly[i].x),
					y: parseInt(levelBeingLoaded.firefly[i].y),
					type: TILE.FIREFLY,
					direction: Math.floor(Math.random() * 4),
					movement: 1,
					scanned: false,
					killed: false
					};
				flies.push(newFly);
			}
		}
		else {
			levelMapInUse[parseInt(levelBeingLoaded.firefly.x)][parseInt(levelBeingLoaded.firefly.y)] = TILE.FIREFLY;
			var newFly = {
				x: parseInt(levelBeingLoaded.firefly.x),
				y: parseInt(levelBeingLoaded.firefly.y),
				type: TILE.FIREFLY,
				direction: Math.floor(Math.random() * 4),
				movement: 1,
				scanned: false,
				killed: false
				};
			flies.push(newFly);
		}
	}
	
	levelMapInUse[parseInt(levelBeingLoaded.exit.x)][parseInt(levelBeingLoaded.exit.y)] = TILE.EXIT;
	
	levelMapInUse[parseInt(levelBeingLoaded.player.x)][parseInt(levelBeingLoaded.player.y)] = TILE.PLAYER;
	playerX = parseInt(levelBeingLoaded.player.x);
	playerY = parseInt(levelBeingLoaded.player.y);
	mapX = playerX - 5;
	mapY = playerY - 5;
	mapDraw();
	
	$("#crackObtained").html(levelDiamondsObtained);
	$("#crackNeeded").html(levelDiamondsNeeded);
	$("#gameLevel").html(levelBeingPlayed + 1);
}



var mapDraw = function() {
	mapCenter();
	var gameMap = document.getElementById("gameMap");
	var context = gameMap.getContext("2d");
	context.webkitImageSmoothingEnabled = false;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			context.drawImage(levelMapInUse[mapX + i][mapY + j].img, i * tileWidth, j * tileHeight, tileWidth, tileHeight);
		}
	}
	if (dead) { displayBillBlair(picDeathLabel);}
	if (won) { displayBillBlair(picWinLabel);}
}

var mapCenter = function() {
	if ((playerX < mapX + 2) || (playerX > mapX + 7)) {
		mapX = playerX - 5;
	}
	if ((playerY < mapY + 2) || (playerY > mapY + 7)) {
		mapY = playerY - 5;
	}
	if (playerX < 5) { mapX = 0; }
	if (playerX > 35) { mapX = 30; }
	if (playerY < 5) { mapY = 0; }
	if (playerY > 17) { mapY = 12; }
}

var loadNextLevel = function() {
	dead = false;
	flies = [];
	amoebaList = [];
	boomList = [];
	levelDiamondsObtained = 0;
	if (levelBeingPlayed >= 9) {
		won = true;
	} else {
		levelBeingPlayed += 1;
		levelLoad(levelBeingPlayed);
	}
}

var keyInput = function(keyCode) {
	switch(keyCode) {
		case 78: 
			if (won) {
				levelBeingPlayed = -1;
				won = false;
			}
			//uncomment to be able to skip levels
			//loadNextLevel();
			break;
		case 82: 
			levelBeingPlayed--;
			loadNextLevel();
			break;
		case 83:
			toggleSound();
			break;
		case 37:
		case 38:
		case 39:
		case 40:
			if (!dead) {
				playerMove(keyCode);
			}
			break;
		default:
			break;
	}
}


var playerMove = function(keyCode) {
	var directionX, directionY;
	switch(keyCode) {
		case 37:
			directionX = -1;
			directionY = 0;
			break;
		case 38:
			directionX = 0;
			directionY = -1;
			break;
		case 39:
			directionX = 1;
			directionY = 0;
			break;
		case 40:
			directionX = 0;
			directionY = 1;
			break;
		default:
			return;
			break;
	}
	
	var moved = true;
	switch(levelMapInUse[playerX + directionX][playerY + directionY]) {
		case TILE.AMOEBA:
		case TILE.WALL:
			moved = false;
			break;
		case TILE.DIRT:
		case TILE.EMPTY: 
		case TILE.BOOM:
			break;
		case TILE.ROCK:
			if (levelMapInUse[playerX + directionX * 2][playerY + directionY * 2] == TILE.EMPTY && directionY == 0) {
				levelMapInUse[playerX + directionX * 2][playerY + directionY * 2] = TILE.ROCK;
				levelMapInUse[playerX + directionX][playerY + directionY] = TILE.EMPTY;
			} else {
				moved = false;
			}
			break;
		case TILE.FIREFLY:
		case TILE.BUTTERFLY:
		case TILE.FALLINGROCK:
			moved = false;
			explode(playerX, playerY, TILE.EMPTY);
			break;				
		case TILE.DIAMOND:
		case TILE.FALLINGDIAMOND:
			levelDiamondsObtained++;
			$("#crackObtained").html(levelDiamondsObtained);
			if (!crackHigh) {
				crackHigh = true;
				crackHighTimer = setInterval(crackTumble, 80);
				if (sound) {
					document.getElementById("sfx").currentTime = 0;
					document.getElementById("sfx").play();
				}
			}
			break;
		case TILE.EXIT:
			moved = false;
			if (levelDiamondsObtained >= levelDiamondsNeeded) {
				loadNextLevel();
			}
			break;
		default:
			break;
	}
	
	if (moved) {
		for (var i = 0; i < flies.length; i++) {
			if (!flies[i].killed) { flyScan(flies[i].x, flies[i].y); }
		}
		levelMapInUse[playerX][playerY] = TILE.EMPTY;
		levelMapInUse[playerX + directionX][playerY + directionY] = TILE.PLAYER;
		playerX += directionX;
		playerY += directionY;
		mapDraw();
	}
}




var objectsMove = function() {
	for (var i = 1; i < WIDTH - 1; i++) {
		for (var j = HEIGHT - 2; j > 0; j--) {
		
		
			if (levelMapInUse[i][j] == TILE.ROCK) {
				if (levelMapInUse[i][j + 1] == TILE.EMPTY || levelMapInUse[i][j + 1] == TILE.FIREFLY
					|| levelMapInUse[i][j + 1] == TILE.BUTTERFLY || levelMapInUse[i][j + 1] == TILE.BOOM) {
					levelMapInUse[i][j] = TILE.FALLINGROCK; 
					continue;
				}
				
				if ( levelMapInUse[i][j + 1] == TILE.ROCK || levelMapInUse[i][j + 1] == TILE.WALL
					|| levelMapInUse[i][j + 1] == TILE.DIAMOND ) {
					if ( levelMapInUse[i - 1][j] == TILE.EMPTY && levelMapInUse[i - 1][j + 1] == TILE.EMPTY
						&& levelMapInUse[i + 1][j] == TILE.EMPTY && levelMapInUse[i + 1][j + 1] == TILE.EMPTY) {
						var fallDirection = (Math.floor((Math.random() * 100) + 1) > 50) ? -1 : 1;
						levelMapInUse[i][j] = TILE.EMPTY;
						levelMapInUse[i + fallDirection][j] = TILE.ROCK;
					}
					else {
						if (( levelMapInUse[i - 1][j] == TILE.EMPTY && levelMapInUse[i - 1][j + 1] == TILE.EMPTY) 
								|| (levelMapInUse[i - 1][j] == TILE.BOOM && levelMapInUse[i - 1][j + 1] == TILE.BOOM)){
							levelMapInUse[i][j] = TILE.EMPTY;
							levelMapInUse[i - 1][j] = TILE.ROCK;
						}
						if (( levelMapInUse[i + 1][j] == TILE.EMPTY && levelMapInUse[i + 1][j + 1] == TILE.EMPTY) 
								|| (levelMapInUse[i - 1][j] == TILE.BOOM && levelMapInUse[i - 1][j + 1] == TILE.BOOM)){
							levelMapInUse[i][j] = TILE.EMPTY;
							levelMapInUse[i + 1][j] = TILE.ROCK;
						}
					}
				}
				continue;
			} //end if (ROCK)
			
			
			if (levelMapInUse[i][j] == TILE.FALLINGROCK) {
				switch (levelMapInUse[i][j + 1]) {
					case TILE.EMPTY: 
					case TILE.BOOM:
						levelMapInUse[i][j] = TILE.EMPTY;
						levelMapInUse[i][j + 1] = TILE.FALLINGROCK;
						break;
					case TILE.PLAYER:
					case TILE.FIREFLY:
						explode(i, j + 1, TILE.EMPTY);
						break;
					case TILE.BUTTERFLY:
						explode(i, j + 1, TILE.DIAMOND);
						break;
					default:
						levelMapInUse[i][j] = TILE.ROCK;
						break;
				}
			}//end if (FALLINGROCK)
			
			
			
			
			
			if (levelMapInUse[i][j] == TILE.DIAMOND) {
				if (levelMapInUse[i][j + 1] == TILE.EMPTY || levelMapInUse[i][j + 1] == TILE.FIREFLY
					|| levelMapInUse[i][j + 1] == TILE.BUTTERFLY || levelMapInUse[i][j + 1] == TILE.BOOM) {
					levelMapInUse[i][j] = TILE.FALLINGDIAMOND; 
					continue;
				}
				
				if ( levelMapInUse[i][j + 1] == TILE.ROCK || levelMapInUse[i][j + 1] == TILE.WALL
					|| levelMapInUse[i][j + 1] == TILE.DIAMOND ) {
					if ( levelMapInUse[i - 1][j] == TILE.EMPTY && levelMapInUse[i - 1][j + 1] == TILE.EMPTY
						&& levelMapInUse[i + 1][j] == TILE.EMPTY && levelMapInUse[i + 1][j + 1] == TILE.EMPTY) {
						var fallDirection = (Math.floor((Math.random() * 100) + 1) > 50) ? -1 : 1;
						levelMapInUse[i][j] = TILE.EMPTY;
						levelMapInUse[i + fallDirection][j] = TILE.DIAMOND;
					}
					else {
						if ( (levelMapInUse[i - 1][j] == TILE.EMPTY && levelMapInUse[i - 1][j + 1] == TILE.EMPTY)
									|| (levelMapInUse[i - 1][j] == TILE.BOOM && levelMapInUse[i - 1][j + 1] == TILE.BOOM)) {
							levelMapInUse[i][j] = TILE.EMPTY;
							levelMapInUse[i - 1][j] = TILE.DIAMOND;
						}
						if (( levelMapInUse[i + 1][j] == TILE.EMPTY && levelMapInUse[i + 1][j + 1] == TILE.EMPTY)
								|| (levelMapInUse[i - 1][j] == TILE.BOOM && levelMapInUse[i - 1][j + 1] == TILE.BOOM)){
							levelMapInUse[i][j] = TILE.EMPTY;
							levelMapInUse[i + 1][j] = TILE.DIAMOND;
						}
					}
				}
				continue;
			} //end if (DIAMOND)
			
			if (levelMapInUse[i][j] == TILE.FALLINGDIAMOND) {
				switch (levelMapInUse[i][j + 1]) {
					case TILE.EMPTY: 
					case TILE.BOOM:
						levelMapInUse[i][j] = TILE.EMPTY;
						levelMapInUse[i][j + 1] = TILE.FALLINGDIAMOND;
						break;
					default:
						levelMapInUse[i][j] = TILE.DIAMOND;
						break;
				}
			}//end if (FALLINGDIAMOND)
			
		} //end for
	} //end for
	
	if (amoebaList.length > 0) { amoebaExpand(); }
	if (flies.length > 0) { fliesMove(); }
	mapDraw();

}


var fliesMove = function() {
	for (var i = 0; i < flies.length; i++) {
		if (!flies[i].killed) {
			var dirx, diry;
			switch (flies[i].direction) {
				case 0: dirx = 0; diry = -1; break;
				case 1: dirx = 1; diry = 0; break;
				case 2: dirx = 0; diry = 1; break;
				case 3: dirx = -1; diry = 0; break;
				default: dirx = 0; diry = 0; break;
			} //end switch (flies[i].direction)
			
			if (levelMapInUse[flies[i].x + dirx][flies[i].y + diry] == TILE.EMPTY
					|| levelMapInUse[flies[i].x + dirx][flies[i].y + diry] == TILE.BOOM) {
				levelMapInUse[flies[i].x][flies[i].y] = TILE.EMPTY;
				levelMapInUse[flies[i].x + dirx][flies[i].y + diry] = flies[i].type;
				flies[i].x += dirx;
				flies[i].y += diry;
			}
			else if (levelMapInUse[flies[i].x + dirx][flies[i].y + diry] == TILE.FALLINGROCK
					|| levelMapInUse[flies[i].x + dirx][flies[i].y + diry - 1] == TILE.FALLINGROCK) {
				if (flies[i].type == TILE.FIREFLY) { 
					explode(flies[i].x, flies[i].y, TILE.EMPTY); 
				}
				else { 
					explode(flies[i].x, flies[i].y, TILE.DIAMOND); 
				}
				flies[i].killed = true;
				return;
			}
			else { //rotate
				flies[i].direction += flies[i].movement;
				if (flies[i].direction > 3) {flies[i].direction = 0;}
				if (flies[i].direction < 0) {flies[i].direction = 3;}
			}
			
			flyScan(flies[i].x, flies[i].y);
			
			
		} //end if (!killed)
	}
}

var flyScan = function(x, y) {
	if ((playerX == x && playerY >= y - 1 && playerY <= y + 1)
		|| (playerY == y && playerX >= x - 1 && playerX <= x + 1)) {
		explode(x, y, TILE.EMPTY);
	}
}








var animate = function() {
	switch (animationCount) {
		case 0:
			if (!crackHigh) { TILE.PLAYER.img = picPlayer; }
			TILE.FALLINGROCK.img = picFallingRock;
			TILE.FALLINGDIAMOND.img = picFallingDiamond;
			TILE.AMOEBA.img = picAmoeba;
			break;
		case 1:
			TILE.FALLINGROCK.img = picFallingRock2;
			TILE.FALLINGDIAMOND.img = picFallingDiamond2;
			break;
		case 2:
			if (!crackHigh) { TILE.PLAYER.img = picPlayer3; }
			TILE.FALLINGROCK.img = picFallingRock3;
			TILE.FALLINGDIAMOND.img = picFallingDiamond3;
			TILE.AMOEBA.img = picAmoeba3;
			break;
		case 3:
			TILE.FALLINGROCK.img = picFallingRock4;
			TILE.FALLINGDIAMOND.img = picFallingDiamond4;
			break;
		default:
			break;
	}
	animationCount = (animationCount > 3) ? 0 : animationCount + 1;
	mapDraw();
}


var crackTumble = function() {
	switch (crackTumbleCount) {
		case 0:
			TILE.PLAYER.img = tumble2;
			break;
		case 1:
			TILE.PLAYER.img = tumble3;
			break;
		case 2:
			TILE.PLAYER.img = tumble4;
			break;
		default:
			crackHigh = false;
			crackTumbleCount = 0;
			TILE.PLAYER.img = picPlayer;
			clearInterval(crackHighTimer);
			break;
	}
	
	crackTumbleCount++;
	var gameMap = document.getElementById("gameMap");
	var context = gameMap.getContext("2d");
	context.webkitImageSmoothingEnabled = false;
	context.drawImage(TILE.PLAYER.img, (playerX - mapX) * tileWidth, (playerY - mapY) * tileHeight, tileWidth, tileHeight);
}


var explode = function(x, y, tile) {
	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j <= y + 1; j++) {
			if (levelMapInUse[i][j] != TILE.WALL) {
				if (levelMapInUse[i][j] == TILE.PLAYER) {
					dead = true;
					displayBillBlair(picDeathLabel);
				}
				if (levelMapInUse[i][j] == TILE.FIREFLY || levelMapInUse[i][j] == TILE.BUTTERFLY) {
					for (var ii = 0; ii < flies.length; ii++) {
						if (flies[ii].x == i && flies[ii].y == j) {
							flies[ii].killed = true;
							levelMapInUse[i][j] = TILE.EMPTY
						}
					}
				}
				levelMapInUse[i][j] = tile;
				if (tile == TILE.EMPTY) {
					levelMapInUse[i][j] = TILE.BOOM;
					var bombSite = { x: i, y: j };
					boomList.push(bombSite);
					var boomTicker = setTimeout(function() {
						if (levelMapInUse[boomList[0].x][boomList[0].y] == TILE.BOOM) {
							levelMapInUse[boomList[0].x][boomList[0].y] = TILE.EMPTY;
						}
						boomList.shift();
						}, 1000);
				}
			}
		}
	}
	mapDraw();
}

var amoebaExpand = function() {
	var expandChance, dir, x, y, loopCount;
	loopCount = amoebaList.length;
	for (var amoeba = 0; amoeba < loopCount; amoeba++) {
		expandChance = Math.floor(Math.random() * 100);
		if (expandChance < 32) {
			dir = Math.floor(Math.random() * 4);
			switch (dir) {
				case 0: x = 0; y = -1; break;
				case 1: x = 1; y = 0; break;
				case 2: x = 0; y = 1; break;
				case 3: x = -1; y = 0; break;
				default: x = 0; y = 0; break;
			}
			if (levelMapInUse[amoebaList[amoeba].x + x][amoebaList[amoeba].y + y] == TILE.EMPTY) {
				var newAmoeba = { 
					x: amoebaList[amoeba].x + x,
					y: amoebaList[amoeba].y + y
				};
				levelMapInUse[newAmoeba.x][newAmoeba.y] = TILE.AMOEBA;
				amoebaList.push(newAmoeba);
			}
		}
	}
}

var displayBillBlair = function(winLose) {
	var gameMap = document.getElementById("gameMap");
	var context = gameMap.getContext("2d");
	context.webkitImageSmoothingEnabled = false;
	context.drawImage(winLose, gameWindowHeight / 2 - winLose.width / 2, gameWindowHeight / 2 - winLose.height / 2, winLose.width, winLose.height);
}

var toggleSound = function() {
	if (!sound) {
		$("#soundButton").html("SOUND: ON");
		document.getElementById("music").play();
	} else {
		$("#soundButton").html("SOUND: OFF");
		document.getElementById("music").pause();
	}
	sound = !sound;
}

var displayHeadline = function() {
	var headlinePicker = Math.floor(Math.random() * news.length);
	$("#newsTicker").html(news[headlinePicker]);
}


var playMayorsQuest = function(div) {
	//$(div).prepend(banner);
	levelLoad(levelBeingPlayed);
	$(document).keydown(function(event){ keyInput(event.keyCode); return false; });
	$("#soundButton").click(toggleSound);
	animationTimer = setInterval(animate, 100);
	objectsTimer = setInterval(objectsMove, 250);
	newsTimer = setInterval(displayHeadline, 10000);
}

window.onload = function() {
	playMayorsQuest("#mayorsQuest");
}