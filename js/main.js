var game;
var players = [];
var losers = [];
var winner;
var bg;
var music;
var winAudio;
var arena;
var rightRectangle;
var leftRectangle;
var updateCount = 0;
var winningState = false;
var gameControls = [ [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SHIFT],
                      [Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.E]
];
var rotateStage;
var focusOne = {x:FOCUS_ONE_X, y:FOCUS_ONE_Y};
var focusTwo = {x:FOCUS_TWO_X, y:FOCUS_TWO_Y};
var rectangleScaler = 1;
var initiateTimer;
var timer = TIMER_COUNT, minutes, seconds;

/*
//removes start menu
//displays time
//starts game
*/
function startGame() {
  console.log("this button works.");
  $(".start-menu").fadeOut();
  initiateTimer = setInterval(startTimer, 1000);
  game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "gameDiv",
    {init:init, preload:preload, create:create, update:update});
}

/*
//initializes game
*/
function init() {
  game.enterKeyUp = true;
}

/*
//loads physics
//loads images
//loads spritesheets
//loads audio
*/
function preload() {
  //set physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //load image
  game.load.image("bg", "./assets/img/city.png");
  game.load.image("winBg", "./assets/img/win-background.jpg");
  game.load.image("arena", "./assets/img/yellow-gold-circle.png");
  game.load.image("rightRectangle", "./assets/img/Orange_Rectangle_body.png");
  game.load.image("leftRectangle", "./assets/img/Orange_Rectangle_body.png");

  //load spritesheets (animations)
  game.load.spritesheet("douxSprite", "./assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-doux.png", 24, 24, 24);
  game.load.spritesheet("mortSprite", "./assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-mort.png", 24, 24, 24);
  game.load.spritesheet("yellowFirework", "./assets/img/Fireworks/yellowshot.png", 42, 42, 8);
  game.load.spritesheet("redFirework", "./assets/img/Fireworks/redshot.png", 42, 42, 8);
  game.load.spritesheet("blueFirework", "./assets/img/Fireworks/blueshot.png", 42, 42, 8);

  //load audio
  game.load.audio("music", "./assets/audio/Waiting-for-something.mp3");
  game.load.audio("winAudio", "./assets/audio/8-Bit-Sound-Library/Mp3/Jingle_Win_00.mp3");
  game.load.audio("hit", "./assets/audio/toy_duck_rubber_squeeze_002.mp3");
  game.load.audio("fireworkBang", "./assets/audio/gun_fire.wav");
}

/*
//creates background
//creates arena
//creates sounds
//creates fireworks
//creates win menu
//creates characters
*/
function create() {
  //created background and make it scroll
  bg = game.add.tileSprite(0, 0, GAME_WIDTH, BG_HEIGHT, "bg");
  bg.autoScroll(BACKGROUND_SCROLL, 0);

  //adds arena
  rightRectangle = game.add.tileSprite(RIGHT_RECTANGLE_X, RIGHT_RECTANGLE_Y, ARENA_WIDTH, ARENA_HEIGHT, "rightRectangle");
  rightRectangle.scale.setTo(RECTANGLE_SCALE_X, RECTANGLE_SCALE_Y);
  rightRectangle.anchor.setTo(HIT_BOX_SCALE);
  leftRectangle = game.add.tileSprite(LEFT_RECTANGLE_X, RIGHT_RECTANGLE_Y, ARENA_WIDTH, ARENA_HEIGHT, "leftRectangle");
  leftRectangle.scale.setTo(RECTANGLE_SCALE_X, RECTANGLE_SCALE_Y);
  leftRectangle.anchor.setTo(HIT_BOX_SCALE);
  arena = game.add.tileSprite(ARENA_POS_X, ARENA_POS_Y, ARENA_WIDTH, ARENA_HEIGHT, "arena");
  arena.scale.setTo(ARENA_SCALE_X, ARENA_SCALE_Y);
  arena.anchor.setTo(HIT_BOX_SCALE);

  //add fireworks
  yellowFirework = game.add.sprite(0, 0, "yellowFirework");
  yellowFirework.animations.add("yellowPop", [0, 1, 2, 3, 4, 5, 6, 7], FRAME_SPEED, true);
  yellowFirework.kill();
  yellowFirework.scale.setTo(FIREWORK_SCALE, FIREWORK_SCALE);
  redFirework = game.add.sprite(0, 0, "redFirework");
  redFirework.animations.add("redPop", [0, 1, 2, 3, 4, 5, 6, 7], FRAME_SPEED, true);
  redFirework.kill();
  redFirework.scale.setTo(FIREWORK_SCALE, FIREWORK_SCALE);
  blueFirework = game.add.sprite(0, 0, "blueFirework");
  blueFirework.animations.add("bluePop", [0, 1, 2, 3, 4, 5, 6, 7], FRAME_SPEED, true);
  blueFirework.kill();
  blueFirework.scale.setTo(FIREWORK_SCALE, FIREWORK_SCALE);

  //set-up sounds and start background music
  music = game.add.audio("music");
  music.play(); //background music
  winAudio = game.add.audio("winAudio");
  hit = game.add.audio("hit");
  fireworkBang = game.add.audio("fireworkBang");

  //win menu
  winBg = game.add.sprite(0, 0, "winBg");
  winBg.scale.setTo(WIN_BG_SCALE_X, WIN_BG_SCALE_Y);
  winBg.alpha = WIN_BG_ALPHA;
  winBg.kill();

  //attempt at creating all characters
  doux = game.add.sprite(PLAYER_ONE_INITIAL_POSITION_X, PLAYER_ONE_INITIAL_POSITION_Y, "douxSprite");
  doux.name = "Doux";
  players.push(doux);
  mort = game.add.sprite(PLAYER_TWO_INITIAL_POSITION_X, PLAYER_TWO_INITIAL_POSITION_Y, "mortSprite");
  mort.name = "Mort";
  players.push(mort);

  for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++) {
    players[currentPlayer].scale.setTo(PLAYER_SCALE, PLAYER_SCALE);
    players[currentPlayer].animations.add("idle" + players[currentPlayer].name, [0, 1, 2], FRAME_SPEED, true);
    players[currentPlayer].animations.add("walk" + players[currentPlayer].name, [3, 4, 5, 6, 7, 8], FRAME_SPEED, true);
    players[currentPlayer].animations.add("death" + players[currentPlayer].name, [13, 14], FRAME_SPEED, true);
    players[currentPlayer].animations.add("kick" + players[currentPlayer].name, [11, 12, 13], HALF_FRAME_SPEED, true);
    players[currentPlayer].animations.add("running" + players[currentPlayer].name, [17, 18, 19, 20, 21, 22, 23], FRAME_SPEED, true);
    players[currentPlayer].animations.play("idle" + players[currentPlayer].name);
    players[currentPlayer].anchor.setTo(HIT_BOX_SCALE); //Middle
    game.physics.arcade.enableBody(players[currentPlayer]);
    players[currentPlayer].body.width *= HIT_BOX_SCALE;
    players[currentPlayer].body.height *= HIT_BOX_SCALE;
    players[currentPlayer].wins = 0;
  }
  //switches direction of one player
  players[0].scale.x *= SWITCH_DIRECTION;
}

/*
//has a counter if someone has won
//stuns characters when counter is reset
//passes controls to characters when count is at a set number
//detects character and arena collision
//randomly shoots fireworks
*/
function update() {
  if (winningState === false) {
    //stop the players in stun state 
    if (updateCount === INITIATE_STUN_COUNT) {
      stun();
    }

    //characters become unstunned and can move
    else if (updateCount > END_STUN_COUNT) {
      controls();
    }
    
    //collision detection
    for(var firstCheck = 0; firstCheck < players.length; firstCheck++) {
      for(var secondCheck = 1; secondCheck < players.length; secondCheck++) {
        game.physics.arcade.collide(players[firstCheck], players[secondCheck], bounceCollision, null, this);
      }
      arenaCollision(players[firstCheck], arena);
    }

    //randomly shoots fireworks
    firework();

    updateCount++;
  }
}

document.getElementsByClassName("start-button")[0].addEventListener("click", startGame);
document.getElementsByClassName("restart-button")[0].addEventListener("click", restart);