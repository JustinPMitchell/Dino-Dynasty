var game;
var players = [];
var losers = [];
var winner;
var bg;
var music;
var winAudio;
var battleArena;
var rectangle1;
var rectangle2;
var updateCount = 0;
var winningState = false;
var gameControls = [ [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SHIFT],
                      [Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.E]
];
var k = 1;
var myVar;

//NEED TO RESTART PROPERLY
function restart() {
  console.log("This game was restarted.");
  winningState = false;
  $(".winning-menu").fadeOut();
  winBg.kill();

  //reset music
  winAudio.pause();
  music.play();

  //reset characters and animations
  players[0].reset(PLAYER_ONE_INITIAL_POSITION_X, PLAYER_ONE_INITIAL_POSITION_Y);
  players[1].reset(PLAYER_TWO_INITIAL_POSITION_X, PLAYER_TWO_INITIAL_POSITION_Y);
  players[0].body.width *= HIT_BOX_SCALE;
  players[0].body.height *= HIT_BOX_SCALE;
  players[1].body.width *= HIT_BOX_SCALE;
  players[1].body.height *= HIT_BOX_SCALE;
  players[0].scale.setTo(PLAYER_SCALE, PLAYER_SCALE);
  players[1].scale.setTo(PLAYER_SCALE, PLAYER_SCALE);
  players[0].angle = 0;
  players[1].angle = 0;

  players[0].scale.x *= SWITCH_DIRECTION;

  losers = [];
  updateCount = 0;

  //startTimer(TIMER_COUNT, document.body.getElementsByClassName('time')[0]);
  document.getElementsByClassName('time')[0].style.display = "inline";
  timer = 120;
  minutes = 2;
  seconds = 0;

  //hide reset button TODO: need to make reset button in html
}

function startGame() {
  console.log("this button works.");
  $(".start-menu").fadeOut();
  document.getElementsByClassName("time")[0].style.display = "inline";
  startTimer(TIMER_COUNT, document.body.getElementsByClassName('time')[0]);
  game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "gameDiv",
    {init:init, preload:preload, create:create, update:update});
}

function init() {
  game.enterKeyUp = true;
}

function preload() {
  //set physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //load image
  game.load.image("bg", "../assets/img/city.png");
  game.load.image("winBg", "../assets/img/win-background.jpg");
  game.load.image("arena", "../assets/img/yellow-gold-circle.png");
  game.load.image("rectangle1", "../assets/img/Orange_Rectangle_body.png");
  game.load.image("rectangle2", "../assets/img/Orange_Rectangle_body.png");

  //load spritesheets (animations)
  game.load.spritesheet("douxSprite", "../assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-doux.png", 24, 24, 24);
  game.load.spritesheet("mortSprite", "../assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-mort.png", 24, 24, 24);
  game.load.spritesheet("yellowFirework", "../assets/img/Fireworks/yellowshot.png", 42, 42, 8);
  game.load.spritesheet("redFirework", "../assets/img/Fireworks/redshot.png", 42, 42, 8);
  game.load.spritesheet("blueFirework", "../assets/img/Fireworks/blueshot.png", 42, 42, 8);

  //load audio
  game.load.audio("music", "../assets/audio/Waiting-for-something.mp3");
  game.load.audio("winAudio", "../assets/audio/8-Bit-Sound-Library/Mp3/Jingle_Win_00.mp3");
  game.load.audio("hit", "../assets/audio/toy_duck_rubber_squeeze_002.mp3");
}

function create() {
  //created background and make it scroll
  bg = game.add.tileSprite(0, 0, GAME_WIDTH, BG_HEIGHT, "bg");
  bg.autoScroll(-30, 0);

  //adds arena
  rectangle1 = game.add.tileSprite((ARENA_POS_X * 4) + 150, ARENA_POS_Y*1.3 * 1.25, ARENA_WIDTH, ARENA_HEIGHT, "rectangle1");
  rectangle1.scale.setTo(ARENA_SCALE_X / 1.7, ARENA_SCALE_Y);
  rectangle1.anchor.setTo(HIT_BOX_SCALE);
  rectangle2 = game.add.tileSprite((ARENA_POS_X * 4) - 150, ARENA_POS_Y*1.3 * 1.25, ARENA_WIDTH, ARENA_HEIGHT, "rectangle2");
  rectangle2.scale.setTo(ARENA_SCALE_X / 1.7, ARENA_SCALE_Y);
  rectangle2.anchor.setTo(HIT_BOX_SCALE);
  battleArena = game.add.tileSprite(ARENA_POS_X * 4, ARENA_POS_Y * 1.25, ARENA_WIDTH, ARENA_HEIGHT, "arena");
  battleArena.scale.setTo(ARENA_SCALE_X, ARENA_SCALE_Y);
  battleArena.anchor.setTo(HIT_BOX_SCALE);

  //set-up sounds and start background music
  music = game.add.audio("music");
  music.play(); //background music
  winAudio = game.add.audio("winAudio");
  hit = game.add.audio("hit");

  //add fireworks
  yellowFirework = game.add.sprite(100, 100, "yellowFirework");
  yellowFirework.animations.add("yellowPop", [0, 1, 2, 3, 4, 5, 6, 7], FRAME_SPEED, true);
  yellowFirework.kill();
  yellowFirework.scale.setTo(5, 5);
  redFirework = game.add.sprite(100, 100, "redFirework");
  redFirework.animations.add("redPop", [0, 1, 2, 3, 4, 5, 6, 7], FRAME_SPEED, true);
  redFirework.kill();
  redFirework.scale.setTo(5, 5);
  blueFirework = game.add.sprite(100, 100, "blueFirework");
  blueFirework.animations.add("bluePop", [0, 1, 2, 3, 4, 5, 6, 7], FRAME_SPEED, true);
  blueFirework.kill();
  blueFirework.scale.setTo(5, 5);

  //win menu
  winBg = game.add.sprite(0, 0, "winBg");
  winBg.scale.setTo(3.5, 2.5);
  winBg.alpha = 0.8;
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
    console.log(players.wins);
  }
  console.log(players);
  //switches direction of one player
  players[0].scale.x *= SWITCH_DIRECTION;
}

function update() {
  if (winningState === false) {
    //console.log(players[0].body.position);
    //stop the players in stun state 
    if (updateCount === INITIATE_STUN_COUNT) {
      for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++) {
        players[currentPlayer].animations.play("death" + players[currentPlayer].name);
        players[currentPlayer].body.velocity.set(0);
      }
      updateCount++;
    }

    //characters become unstunned and can move
    else if (updateCount > END_STUN_COUNT) {
      //stop the players if an arrow key isn't down
      for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++) {
        players[currentPlayer].body.velocity.set(0);
      }

      //keyboard controls will update in the array gameControls
      for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++) {

        //left control
        if(game.input.keyboard.isDown(gameControls[currentPlayer][0])) {
          if(players[currentPlayer].scale.x > 0) {
            players[currentPlayer].scale.x *= SWITCH_DIRECTION;
          }
          players[currentPlayer].body.velocity.x = -PLAYER_SPEED;
          players[currentPlayer].animations.play("walk" + players[currentPlayer].name);
        }

        //right control
        else if(game.input.keyboard.isDown(gameControls[currentPlayer][1])) {
          if(players[currentPlayer].scale.x < 0) {
            players[currentPlayer].scale.x *= SWITCH_DIRECTION;
          }
          players[currentPlayer].body.velocity.x = PLAYER_SPEED;
          players[currentPlayer].animations.play("walk" + players[currentPlayer].name);
        }

        //up control
        if(game.input.keyboard.isDown(gameControls[currentPlayer][2])) {
          players[currentPlayer].body.velocity.y = -PLAYER_SPEED;
          players[currentPlayer].animations.play("walk" + players[currentPlayer].name);
        }

        //down control
        else if(game.input.keyboard.isDown(gameControls[currentPlayer][3])) {
          players[currentPlayer].body.velocity.y = PLAYER_SPEED;
          players[currentPlayer].animations.play("walk" + players[currentPlayer].name);
        }

        //kick control
        if(game.input.keyboard.isDown(gameControls[currentPlayer][4])) {
          players[currentPlayer].animations.play("kick" + players[currentPlayer].name);
          kick(players[currentPlayer]);
        }

        //idle control
        if(!(game.input.keyboard.isDown(gameControls[currentPlayer][0])) 
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][1])) 
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][2])) 
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][3]))
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][4]))) {
          players[currentPlayer].animations.play("idle" + players[currentPlayer].name);
        }
      }
    }
    
    //collision detection
    for(var firstCheck = 0; firstCheck < players.length; firstCheck++) {
      for(var secondCheck = 1; secondCheck < players.length; secondCheck++) {
        game.physics.arcade.collide(players[firstCheck], players[secondCheck], bounceCollision, null, this);
      }
      arenaCollision(players[firstCheck], battleArena)
    }

    firework();

    updateCount++;
    //console.log(updateCount);
  }
}



document.getElementsByClassName("start-button")[0].addEventListener("click", startGame);
document.getElementsByClassName("restart-button")[0].addEventListener("click", restart);







