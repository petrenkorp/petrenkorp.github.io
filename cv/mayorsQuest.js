/*
 *	MAYOR'S QUEST
 *	by Edward Petrenko
 *	
 *
 */

function MayorsQuest() {
	
	this.WIDTH = 40;
	this.HEIGHT = 22;
	this.tileSize = Math.floor(document.getElementById("gameMap").offsetHeight / 10); //MAKE THIS MULTIPLES OF 20, TO PREVENT SKEWING
	this.tileHeight = Math.floor(document.getElementById("gameMap").offsetHeight / 10);
	this.tileWidth = Math.floor(document.getElementById("gameMap").offsetWidth / 10);
	this.gameWindowHeight = this.tileSize * 10;
	this.gameWindowWidth = this.tileSize * 10;

	this.levelBeingPlayed = 0;
	this.levelMapInUse = new Array(this.WIDTH);
	for (var x = 0; x < this.WIDTH; x++) {
		this.levelMapInUse[x] = new Array(this.HEIGHT);
	}
	this.levelDiamondsNeeded = 0;
	this.levelDiamondsObtained = 0;
	this.playerX, this.playerY, this.mapX, this.mapY;
	this.animationCount = 0;
	this.crackTumbleCount = 0;
	this.animationTimer, this.objectsTimer, this.crackHighTimer, this.newsTimer;
	this.dead = false;
	this.won = false;
	this.crackHigh = false;
	this.flies = [];
	this.amoebaList = [];
	this.boomList = [];
	this.sound = false;

	this.picEmpty = new Image(this.tileWidth, this.tileHeight);
	this.picEmpty.src = "mayorsQuestRes/empty.png";
	this.picDirt = new Image(this.tileWidth, this.tileHeight);
	this.picDirt.src = "mayorsQuestRes/dirt.png";
	this.picWall = new Image(this.tileWidth, this.tileHeight);
	this.picWall.src = "mayorsQuestRes/wall.png";
	this.picRock = new Image(this.tileWidth, this.tileHeight);
	this.picRock.src = "mayorsQuestRes/rock.png";
	this.picFallingRock = new Image(this.tileWidth, this.tileHeight);
	this.picFallingRock.src = "mayorsQuestRes/fallingrock.png";
	this.picDiamond = new Image(this.tileWidth, this.tileHeight);
	this.picDiamond.src = "mayorsQuestRes/diamond.png";
	this.picFallingDiamond = new Image(this.tileWidth, this.tileHeight);
	this.picFallingDiamond.src = "mayorsQuestRes/fallingdiamond.png";
	this.picAmoeba = new Image(this.tileWidth, this.tileHeight);
	this.picAmoeba.src = "mayorsQuestRes/amoeba.png";
	this.picFirefly = new Image(this.tileWidth, this.tileHeight);
	this.picFirefly.src = "mayorsQuestRes/firefly.png";
	this.picButterfly = new Image(this.tileWidth, this.tileHeight);
	this.picButterfly.src = "mayorsQuestRes/butterfly.png";
	this.picExit = new Image(this.tileWidth, this.tileHeight);
	this.picExit.src = "mayorsQuestRes/exit.png";
	this.picPlayer = new Image(this.tileWidth, this.tileHeight);
	this.picPlayer.src = "mayorsQuestRes/player.png";
	this.picExplosion = new Image(this.tileWidth, this.tileHeight);
	this.picExplosion.src = "mayorsQuestRes/explosion.png";

	this.picPlayer3 = new Image(this.tileWidth, this.tileHeight);
	this.picPlayer3.src = "mayorsQuestRes/player3.png";
	this.picAmoeba3 = new Image(this.tileWidth, this.tileHeight);
	this.picAmoeba3.src = "mayorsQuestRes/amoeba3.png";
	this.picFallingRock2 = new Image(this.tileWidth, this.tileHeight);
	this.picFallingRock2.src = "mayorsQuestRes/fallingrock2.png";
	this.picFallingRock3 = new Image(this.tileWidth, this.tileHeight);
	this.picFallingRock3.src = "mayorsQuestRes/fallingrock3.png";
	this.picFallingRock4 = new Image(this.tileWidth, this.tileHeight);
	this.picFallingRock4.src = "mayorsQuestRes/fallingrock4.png";
	this.picFallingDiamond2 = new Image(this.tileWidth, this.tileHeight);
	this.picFallingDiamond2.src = "mayorsQuestRes/fallingdiamond2.png";
	this.picFallingDiamond3 = new Image(this.tileWidth, this.tileHeight);
	this.picFallingDiamond3.src = "mayorsQuestRes/fallingdiamond3.png";
	this.picFallingDiamond4 = new Image(this.tileWidth, this.tileHeight);
	this.picFallingDiamond4.src = "mayorsQuestRes/fallingdiamond4.png";
	this.tumble2 = new Image(this.tileWidth, this.tileHeight);
	this.tumble2.src = "mayorsQuestRes/tumble2.png";
	this.tumble3 = new Image(this.tileWidth, this.tileHeight);
	this.tumble3.src = "mayorsQuestRes/tumble3.png";
	this.tumble4 = new Image(this.tileWidth, this.tileHeight);
	this.tumble4.src = "mayorsQuestRes/tumble4.png";

	this.picDeathLabel = new Image(this.tileSize * 6, this.tileSize * 7);
	this.picDeathLabel.src = "mayorsQuestRes/deathlabel.jpg";
	this.picWinLabel = new Image(this.tileSize * 6, this.tileSize * 7);
	this.picWinLabel.src = "mayorsQuestRes/winlabel.jpg";

	

	this.news = new Array(
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

	this.TILE = {
		EMPTY: {img: this.picEmpty},
		DIRT: {img: this.picDirt},
		WALL: {img: this.picWall},
		ROCK: {img: this.picRock},
		FALLINGROCK: {img: this.picFallingRock},
		DIAMOND: {img: this.picDiamond},
		FALLINGDIAMOND: {img: this.picFallingDiamond},
		AMOEBA: {img: this.picAmoeba},
		FIREFLY: {img: this.picFirefly},
		BUTTERFLY: {img: this.picButterfly},
		EXIT: {img: this.picExit},
		PLAYER: {img: this.picPlayer},
		BOOM: {img: this.picExplosion}
	};



	//loads in map data
	var levelLoad = function (levelNumber) {
		
		//initialize the working map to blank
		for (var x = 0; x < this.levelMapInUse.length; x++) {
			for (var y = 0; y < this.levelMapInUse[x].length; y++) {
				this.levelMapInUse[x][y] = this.TILE.DIRT;
			}
		}
		
		var levelBeingLoaded = levelSet.level[levelNumber];
		
		//get the number of diamonds needed
		this.levelDiamondsNeeded = parseInt(levelBeingLoaded.diamonds);
		
		//populate the worldmap from the loaded level
		if (levelBeingLoaded.wall) {
			for (var i = 0; i < levelBeingLoaded.wall.length; i++) {
				this.levelMapInUse[parseInt(levelBeingLoaded.wall[i].x)][parseInt(levelBeingLoaded.wall[i].y)] = this.TILE.WALL;
			}
		}
		if (levelBeingLoaded.diamond) {
			for (var i = 0; i < levelBeingLoaded.diamond.length; i++) {
				this.levelMapInUse[parseInt(levelBeingLoaded.diamond[i].x)][parseInt(levelBeingLoaded.diamond[i].y)] = this.TILE.DIAMOND;
			}
		}
		if (levelBeingLoaded.rock) {
			for (var i = 0; i < levelBeingLoaded.rock.length; i++) {
				this.levelMapInUse[parseInt(levelBeingLoaded.rock[i].x)][parseInt(levelBeingLoaded.rock[i].y)] = this.TILE.ROCK;
			}
		}
		if (levelBeingLoaded.empty) { 
			for (var i = 0; i < levelBeingLoaded.empty.length; i++) {
				this.levelMapInUse[parseInt(levelBeingLoaded.empty[i].x)][parseInt(levelBeingLoaded.empty[i].y)] = this.TILE.EMPTY;
			}
		}
		if (levelBeingLoaded.amoeba) { 
			for (var i = 0; i < levelBeingLoaded.amoeba.length; i++) {
				this.levelMapInUse[parseInt(levelBeingLoaded.amoeba[i].x)][parseInt(levelBeingLoaded.amoeba[i].y)] = this.TILE.AMOEBA;
				var amoeba = { 
					x: parseInt(levelBeingLoaded.amoeba[i].x),
					y: parseInt(levelBeingLoaded.amoeba[i].y)
				};
				this.amoebaList.push(amoeba);
			}
		}
		if (levelBeingLoaded.butterfly) { 
			for (var i = 0; i < levelBeingLoaded.butterfly.length; i++) {
				this.levelMapInUse[parseInt(levelBeingLoaded.butterfly[i].x)][parseInt(levelBeingLoaded.butterfly[i].y)] = this.TILE.BUTTERFLY;
				var newFly = {
					x: parseInt(levelBeingLoaded.butterfly[i].x), 
					y: parseInt(levelBeingLoaded.butterfly[i].y),
					type: this.TILE.BUTTERFLY,
					direction: Math.floor(Math.random() * 4),
					movement: -1,
					scanned: false,
					killed: false
					};
				this.flies.push(newFly);
			}
		}
		if (levelBeingLoaded.firefly) { 
			if (levelBeingLoaded.firefly.length) {
				for (var i = 0; i < levelBeingLoaded.firefly.length; i++) {
					this.levelMapInUse[parseInt(levelBeingLoaded.firefly[i].x)][parseInt(levelBeingLoaded.firefly[i].y)] = this.TILE.FIREFLY;
					var newFly = {
						x: parseInt(levelBeingLoaded.firefly[i].x),
						y: parseInt(levelBeingLoaded.firefly[i].y),
						type: this.TILE.FIREFLY,
						direction: Math.floor(Math.random() * 4),
						movement: 1,
						scanned: false,
						killed: false
						};
					this.flies.push(newFly);
				}
			}
			else {
				this.levelMapInUse[parseInt(levelBeingLoaded.firefly.x)][parseInt(levelBeingLoaded.firefly.y)] = this.TILE.FIREFLY;
				var newFly = {
					x: parseInt(levelBeingLoaded.firefly.x),
					y: parseInt(levelBeingLoaded.firefly.y),
					type: this.TILE.FIREFLY,
					direction: Math.floor(Math.random() * 4),
					movement: 1,
					scanned: false,
					killed: false
					};
				this.flies.push(newFly);
			}
		}
		
		this.levelMapInUse[parseInt(levelBeingLoaded.exit.x)][parseInt(levelBeingLoaded.exit.y)] = this.TILE.EXIT;
		
		this.levelMapInUse[parseInt(levelBeingLoaded.player.x)][parseInt(levelBeingLoaded.player.y)] = this.TILE.PLAYER;
		this.playerX = parseInt(levelBeingLoaded.player.x);
		this.playerY = parseInt(levelBeingLoaded.player.y);
		this.mapX = this.playerX - 5;
		this.mapY = this.playerY - 5;
		mapDraw();
		
		$("#crackObtained").html(this.levelDiamondsObtained);
		$("#crackNeeded").html(this.levelDiamondsNeeded);
		$("#gameLevel").html(this.levelBeingPlayed + 1);
	}.bind(this);



	var mapDraw = function() {
		mapCenter();
		var gameMap = document.getElementById("gameMap");
		var context = gameMap.getContext("2d");
		context.webkitImageSmoothingEnabled = false;
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				context.drawImage(this.levelMapInUse[this.mapX + i][this.mapY + j].img, i * this.tileWidth, j * this.tileHeight, this.tileWidth, this.tileHeight);
			}
		}
		if (this.dead) { displayBillBlair(this.picDeathLabel);}
		if (this.won) { displayBillBlair(this.picWinLabel);}
	}.bind(this);

	var mapCenter = function() {
		if ((this.playerX < this.mapX + 2) || (this.playerX > this.mapX + 7)) {
			this.mapX = this.playerX - 5;
		}
		if ((this.playerY < this.mapY + 2) || (this.playerY > this.mapY + 7)) {
			this.mapY = this.playerY - 5;
		}
		if (this.playerX < 5) { this.mapX = 0; }
		if (this.playerX > 35) { this.mapX = 30; }
		if (this.playerY < 5) { this.mapY = 0; }
		if (this.playerY > 17) { this.mapY = 12; }
	}.bind(this);

	var loadNextLevel = function() {
		this.dead = false;
		this.flies = [];
		this.amoebaList = [];
		this.boomList = [];
		this.levelDiamondsObtained = 0;
		if (this.levelBeingPlayed >= 9) {
			this.won = true;
		} else {
			this.levelBeingPlayed += 1;
			levelLoad(this.levelBeingPlayed);
		}
	}.bind(this);

	var keyInput = function(keyCode) {
		switch(keyCode) {
			case 78: 
				if (this.won) {
					this.levelBeingPlayed = -1;
					this.won = false;
				}
				//uncomment to be able to skip levels
				//loadNextLevel();
				return false;
				break;
			case 82: 
				this.levelBeingPlayed--;
				loadNextLevel();
				return false;
				break;
			case 83:
				toggleSound();
				return false;
				break;
			case 37:
			case 38:
			case 39:
			case 40:
				if (!this.dead) {
					playerMove(keyCode);
				}
				return false;
				break;
			default:
				return true;
				break;
		}
	}.bind(this);


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
		switch(this.levelMapInUse[this.playerX + directionX][this.playerY + directionY]) {
			case this.TILE.AMOEBA:
			case this.TILE.WALL:
				moved = false;
				break;
			case this.TILE.DIRT:
			case this.TILE.EMPTY: 
			case this.TILE.BOOM:
				break;
			case this.TILE.ROCK:
				if (this.levelMapInUse[this.playerX + directionX * 2][this.playerY + directionY * 2] == this.TILE.EMPTY && directionY == 0) {
					this.levelMapInUse[this.playerX + directionX * 2][this.playerY + directionY * 2] = this.TILE.ROCK;
					this.levelMapInUse[this.playerX + directionX][this.playerY + directionY] = this.TILE.EMPTY;
				} else {
					moved = false;
				}
				break;
			case this.TILE.FIREFLY:
			case this.TILE.BUTTERFLY:
			case this.TILE.FALLINGROCK:
				moved = false;
				this.explode(this.playerX, this.playerY, this.TILE.EMPTY);
				break;				
			case this.TILE.DIAMOND:
			case this.TILE.FALLINGDIAMOND:
				this.levelDiamondsObtained++;
				$("#crackObtained").html(this.levelDiamondsObtained);
				if (!this.crackHigh) {
					this.crackHigh = true;
					this.crackHighTimer = setInterval(crackTumble, 80);
					if (this.sound) {
						document.getElementById("sfx").currentTime = 0;
						document.getElementById("sfx").play();
					}
				}
				break;
			case this.TILE.EXIT:
				moved = false;
				if (this.levelDiamondsObtained >= this.levelDiamondsNeeded) {
					loadNextLevel();
				}
				break;
			default:
				break;
		}
		
		if (moved) {
			for (var i = 0; i < this.flies.length; i++) {
				if (!this.flies[i].killed) { flyScan(this.flies[i].x, this.flies[i].y); }
			}
			this.levelMapInUse[this.playerX][this.playerY] = this.TILE.EMPTY;
			this.levelMapInUse[this.playerX + directionX][this.playerY + directionY] = this.TILE.PLAYER;
			this.playerX += directionX;
			this.playerY += directionY;
			mapDraw();
		}
	}.bind(this);


	var objectsMove = function() {
		for (var i = 1; i < this.WIDTH - 1; i++) {
			for (var j = this.HEIGHT - 2; j > 0; j--) {
			
			
				if (this.levelMapInUse[i][j] == this.TILE.ROCK) {
					if (this.levelMapInUse[i][j + 1] == this.TILE.EMPTY || this.levelMapInUse[i][j + 1] == this.TILE.FIREFLY
						|| this.levelMapInUse[i][j + 1] == this.TILE.BUTTERFLY || this.levelMapInUse[i][j + 1] == this.TILE.BOOM) {
						this.levelMapInUse[i][j] = this.TILE.FALLINGROCK; 
						continue;
					}
					
					if ( this.levelMapInUse[i][j + 1] == this.TILE.ROCK || this.levelMapInUse[i][j + 1] == this.TILE.WALL
						|| this.levelMapInUse[i][j + 1] == this.TILE.DIAMOND ) {
						if ( this.levelMapInUse[i - 1][j] == this.TILE.EMPTY && this.levelMapInUse[i - 1][j + 1] == this.TILE.EMPTY
							&& this.levelMapInUse[i + 1][j] == this.TILE.EMPTY && this.levelMapInUse[i + 1][j + 1] == this.TILE.EMPTY) {
							var fallDirection = (Math.floor((Math.random() * 100) + 1) > 50) ? -1 : 1;
							this.levelMapInUse[i][j] = this.TILE.EMPTY;
							this.levelMapInUse[i + fallDirection][j] = this.TILE.ROCK;
						}
						else {
							if (( this.levelMapInUse[i - 1][j] == this.TILE.EMPTY && this.levelMapInUse[i - 1][j + 1] == this.TILE.EMPTY) 
									|| (this.levelMapInUse[i - 1][j] == this.TILE.BOOM && this.levelMapInUse[i - 1][j + 1] == this.TILE.BOOM)){
								this.levelMapInUse[i][j] = this.TILE.EMPTY;
								this.levelMapInUse[i - 1][j] = this.TILE.ROCK;
							}
							if (( this.levelMapInUse[i + 1][j] == this.TILE.EMPTY && this.levelMapInUse[i + 1][j + 1] == this.TILE.EMPTY) 
									|| (this.levelMapInUse[i - 1][j] == this.TILE.BOOM && this.levelMapInUse[i - 1][j + 1] == this.TILE.BOOM)){
								this.levelMapInUse[i][j] = this.TILE.EMPTY;
								this.levelMapInUse[i + 1][j] = this.TILE.ROCK;
							}
						}
					}
					continue;
				} //end if (ROCK)
				
				
				if (this.levelMapInUse[i][j] == this.TILE.FALLINGROCK) {
					switch (this.levelMapInUse[i][j + 1]) {
						case this.TILE.EMPTY: 
						case this.TILE.BOOM:
							this.levelMapInUse[i][j] = this.TILE.EMPTY;
							this.levelMapInUse[i][j + 1] = this.TILE.FALLINGROCK;
							break;
						case this.TILE.PLAYER:
						case this.TILE.FIREFLY:
							explode(i, j + 1, this.TILE.EMPTY);
							break;
						case this.TILE.BUTTERFLY:
							explode(i, j + 1, this.TILE.DIAMOND);
							break;
						default:
							this.levelMapInUse[i][j] = this.TILE.ROCK;
							break;
					}
				}//end if (FALLINGROCK)
				
				
				
				
				
				if (this.levelMapInUse[i][j] == this.TILE.DIAMOND) {
					if (this.levelMapInUse[i][j + 1] == this.TILE.EMPTY || this.levelMapInUse[i][j + 1] == this.TILE.FIREFLY
						|| this.levelMapInUse[i][j + 1] == this.TILE.BUTTERFLY || this.levelMapInUse[i][j + 1] == this.TILE.BOOM) {
						this.levelMapInUse[i][j] = this.TILE.FALLINGDIAMOND; 
						continue;
					}
					
					if ( this.levelMapInUse[i][j + 1] == this.TILE.ROCK || this.levelMapInUse[i][j + 1] == this.TILE.WALL
						|| this.levelMapInUse[i][j + 1] == this.TILE.DIAMOND ) {
						if ( this.levelMapInUse[i - 1][j] == this.TILE.EMPTY && this.levelMapInUse[i - 1][j + 1] == this.TILE.EMPTY
							&& this.levelMapInUse[i + 1][j] == this.TILE.EMPTY && this.levelMapInUse[i + 1][j + 1] == this.TILE.EMPTY) {
							var fallDirection = (Math.floor((Math.random() * 100) + 1) > 50) ? -1 : 1;
							this.levelMapInUse[i][j] = this.TILE.EMPTY;
							this.levelMapInUse[i + fallDirection][j] = this.TILE.DIAMOND;
						}
						else {
							if ( (this.levelMapInUse[i - 1][j] == this.TILE.EMPTY && this.levelMapInUse[i - 1][j + 1] == this.TILE.EMPTY)
										|| (this.levelMapInUse[i - 1][j] == this.TILE.BOOM && this.levelMapInUse[i - 1][j + 1] == this.TILE.BOOM)) {
								this.levelMapInUse[i][j] = this.TILE.EMPTY;
								this.levelMapInUse[i - 1][j] = this.TILE.DIAMOND;
							}
							if (( this.levelMapInUse[i + 1][j] == this.TILE.EMPTY && this.levelMapInUse[i + 1][j + 1] == this.TILE.EMPTY)
									|| (this.levelMapInUse[i - 1][j] == this.TILE.BOOM && this.levelMapInUse[i - 1][j + 1] == this.TILE.BOOM)){
								this.levelMapInUse[i][j] = this.TILE.EMPTY;
								this.levelMapInUse[i + 1][j] = this.TILE.DIAMOND;
							}
						}
					}
					continue;
				} //end if (DIAMOND)
				
				if (this.levelMapInUse[i][j] == this.TILE.FALLINGDIAMOND) {
					switch (this.levelMapInUse[i][j + 1]) {
						case this.TILE.EMPTY: 
						case this.TILE.BOOM:
							this.levelMapInUse[i][j] = this.TILE.EMPTY;
							this.levelMapInUse[i][j + 1] = this.TILE.FALLINGDIAMOND;
							break;
						default:
							this.levelMapInUse[i][j] = this.TILE.DIAMOND;
							break;
					}
				}//end if (FALLINGDIAMOND)
				
			} //end for
		} //end for
		
		if (this.amoebaList.length > 0) { amoebaExpand(); }
		if (this.flies.length > 0) { fliesMove(); }
		mapDraw();

	}.bind(this);


	var fliesMove = function() {
		for (var i = 0; i < this.flies.length; i++) {
			if (!this.flies[i].killed) {
				var dirx, diry;
				switch (this.flies[i].direction) {
					case 0: dirx = 0; diry = -1; break;
					case 1: dirx = 1; diry = 0; break;
					case 2: dirx = 0; diry = 1; break;
					case 3: dirx = -1; diry = 0; break;
					default: dirx = 0; diry = 0; break;
				} //end switch (this.flies[i].direction)
				
				if (this.levelMapInUse[this.flies[i].x + dirx][this.flies[i].y + diry] == this.TILE.EMPTY
						|| this.levelMapInUse[this.flies[i].x + dirx][this.flies[i].y + diry] == this.TILE.BOOM) {
					this.levelMapInUse[this.flies[i].x][this.flies[i].y] = this.TILE.EMPTY;
					this.levelMapInUse[this.flies[i].x + dirx][this.flies[i].y + diry] = this.flies[i].type;
					this.flies[i].x += dirx;
					this.flies[i].y += diry;
				}
				else if (this.levelMapInUse[this.flies[i].x + dirx][this.flies[i].y + diry] == this.TILE.FALLINGROCK
						|| this.levelMapInUse[this.flies[i].x + dirx][this.flies[i].y + diry - 1] == this.TILE.FALLINGROCK) {
					if (this.flies[i].type == this.TILE.FIREFLY) { 
						explode(this.flies[i].x, this.flies[i].y, this.TILE.EMPTY); 
					}
					else { 
						explode(this.flies[i].x, this.flies[i].y, this.TILE.DIAMOND); 
					}
					this.flies[i].killed = true;
					return;
				}
				else { //rotate
					this.flies[i].direction += this.flies[i].movement;
					if (this.flies[i].direction > 3) {this.flies[i].direction = 0;}
					if (this.flies[i].direction < 0) {this.flies[i].direction = 3;}
				}
				
				flyScan(this.flies[i].x, this.flies[i].y);
				
				
			} //end if (!killed)
		}
	}.bind(this);

	var flyScan = function(x, y) {
		if ((this.playerX == x && this.playerY >= y - 1 && this.playerY <= y + 1)
			|| (this.playerY == y && this.playerX >= x - 1 && this.playerX <= x + 1)) {
			explode(x, y, this.TILE.EMPTY);
		}
	}.bind(this);



	var animate = function() {
		switch (this.animationCount) {
			case 0:
				if (!this.crackHigh) { this.TILE.PLAYER.img = this.picPlayer; }
				this.TILE.FALLINGROCK.img = this.picFallingRock;
				this.TILE.FALLINGDIAMOND.img = this.picFallingDiamond;
				this.TILE.AMOEBA.img = this.picAmoeba;
				break;
			case 1:
				this.TILE.FALLINGROCK.img = this.picFallingRock2;
				this.TILE.FALLINGDIAMOND.img = this.picFallingDiamond2;
				break;
			case 2:
				if (!this.crackHigh) { this.TILE.PLAYER.img = this.picPlayer3; }
				this.TILE.FALLINGROCK.img = this.picFallingRock3;
				this.TILE.FALLINGDIAMOND.img = this.picFallingDiamond3;
				this.TILE.AMOEBA.img = this.picAmoeba3;
				break;
			case 3:
				this.TILE.FALLINGROCK.img = this.picFallingRock4;
				this.TILE.FALLINGDIAMOND.img = this.picFallingDiamond4;
				break;
			default:
				break;
		}
		this.animationCount = (this.animationCount > 3) ? 0 : this.animationCount + 1;
		mapDraw();
	}.bind(this);


	var crackTumble = function() {
		switch (this.crackTumbleCount) {
			case 0:
				this.TILE.PLAYER.img = this.tumble2;
				break;
			case 1:
				this.TILE.PLAYER.img = this.tumble3;
				break;
			case 2:
				this.TILE.PLAYER.img = this.tumble4;
				break;
			default:
				this.crackHigh = false;
				this.crackTumbleCount = 0;
				this.TILE.PLAYER.img = this.picPlayer;
				clearInterval(this.crackHighTimer);
				break;
		}
		
		this.crackTumbleCount++;
		var gameMap = document.getElementById("gameMap");
		var context = gameMap.getContext("2d");
		context.webkitImageSmoothingEnabled = false;
		context.drawImage(this.TILE.PLAYER.img, (this.playerX - this.mapX) * this.tileWidth, (this.playerY - this.mapY) * this.tileHeight, this.tileWidth, this.tileHeight);
	}.bind(this);


	var explode = function(x, y, tile) {
		for (var i = x - 1; i <= x + 1; i++) {
			for (var j = y - 1; j <= y + 1; j++) {
				if (this.levelMapInUse[i][j] != this.TILE.WALL) {
					if (this.levelMapInUse[i][j] == this.TILE.PLAYER) {
						this.dead = true;
						displayBillBlair(this.picDeathLabel);
					}
					if (this.levelMapInUse[i][j] == this.TILE.FIREFLY || this.levelMapInUse[i][j] == this.TILE.BUTTERFLY) {
						for (var ii = 0; ii < this.flies.length; ii++) {
							if (this.flies[ii].x == i && this.flies[ii].y == j) {
								this.flies[ii].killed = true;
								this.levelMapInUse[i][j] = this.TILE.EMPTY
							}
						}
					}
					this.levelMapInUse[i][j] = tile;
					if (tile == this.TILE.EMPTY) {
						this.levelMapInUse[i][j] = this.TILE.BOOM;
						var bombSite = { x: i, y: j };
						this.boomList.push(bombSite);
						var boomTicker = setTimeout(boomDissipation, 1000);
					}
				}
			}
		}
		mapDraw();
	}.bind(this);
	
	var boomDissipation = function() {
		if (this.levelMapInUse[this.boomList[0].x][this.boomList[0].y] == this.TILE.BOOM) {
			this.levelMapInUse[this.boomList[0].x][this.boomList[0].y] = this.TILE.EMPTY;
		}
		this.boomList.shift();
	}.bind(this);

	var amoebaExpand = function() {
		var expandChance, dir, x, y, loopCount;
		loopCount = this.amoebaList.length;
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
				if (this.levelMapInUse[this.amoebaList[amoeba].x + x][this.amoebaList[amoeba].y + y] == this.TILE.EMPTY) {
					var newAmoeba = { 
						x: this.amoebaList[amoeba].x + x,
						y: this.amoebaList[amoeba].y + y
					};
					this.levelMapInUse[newAmoeba.x][newAmoeba.y] = this.TILE.AMOEBA;
					this.amoebaList.push(newAmoeba);
				}
			}
		}
	}.bind(this);

	var displayBillBlair = function(winLose) {
		var gameMap = document.getElementById("gameMap");
		var context = gameMap.getContext("2d");
		context.webkitImageSmoothingEnabled = false;
		context.drawImage(winLose, this.gameWindowHeight / 2 - winLose.width / 2, this.gameWindowHeight / 2 - winLose.height / 2, winLose.width, winLose.height);
	}.bind(this);

	var toggleSound = function() {
		if (!this.sound) {
			$("#soundButton").html("SOUND: ON");
			document.getElementById("music").play();
		} else {
			$("#soundButton").html("SOUND: OFF");
			document.getElementById("music").pause();
		}
		this.sound = !this.sound;
	}.bind(this);

	var displayHeadline = function() {
		var headlinePicker = Math.floor(Math.random() * this.news.length);
		$("#newsTicker").html(this.news[headlinePicker]);
	}.bind(this);


	this.play = function() {
		levelLoad(this.levelBeingPlayed);
		$(window).keydown(function(event){ return keyInput(event.keyCode); });
		$("#soundButton").click(toggleSound);
		this.animationTimer = setInterval(animate, 100);
		this.objectsTimer = setInterval(objectsMove, 250);
		this.newsTimer = setInterval(displayHeadline, 10000);
	}.bind(this);
	
	

}//end constructor
	

window.onload = function() {
	console.log("hi");
	var mayorsQuest = new MayorsQuest();
	mayorsQuest.play();
};
