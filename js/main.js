

var game;
var players = [];
var losers = [];
var winner;
var bg;
var music;
var winAudio;
var battleArena;
var updateCount = 0;
var winningState = false;
var gameControls = [ [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN],
                      [Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.W, Phaser.Keyboard.S]
];

//NEED TO RESTART PROPERLY
function restart() {
  console.log("This game was restarted.");
  winningState = false;
  document.getElementById("winner").style.display = "none";

  //reset music
  winAudio.pause();
  music.play();

  //reset characters and animations
  console.log(players[0].body.position);
  console.log(players[0]);
  //players[0].position.x = PLAYER_ONE_INITIAL_POSITION_X;
  //players[0].position.y = PLAYER_ONE_INITIAL_POSITION_Y;
  players[0].reset(PLAYER_ONE_INITIAL_POSITION_X, PLAYER_ONE_INITIAL_POSITION_Y);
  players[1].reset(PLAYER_TWO_INITIAL_POSITION_X, PLAYER_TWO_INITIAL_POSITION_Y);
  console.log(players[0].body.position);
  //players[1].position.x = PLAYER_TWO_INITIAL_POSITION_X;
  //players[1].position.y = PLAYER_TWO_INITIAL_POSITION_Y;

  losers = [];
  updateCount = 0;

  //reset-time  TO-DO: figure out how to reset time rather than "combine" times
  document.getElementsByClassName('time')[0].style.display = "inline";
  startTimer(TIMER_COUNT, document.body.getElementsByClassName('time')[0]);

  //hide reset button TODO: need to make reset button in html
}

function startGame() {
  console.log("this button works.");
  $(".start-menu").slideUp();
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
  game.load.image("arena", "../assets/img/yellow-gold-circle.png");

  //load spritesheets (animations)
  game.load.spritesheet("douxSprite", "../assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-doux.png", 24, 24, 24);
  game.load.spritesheet("mortSprite", "../assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-mort.png", 24, 24, 24);
  
  //load audio
  game.load.audio("music", "../assets/audio/one_0.mp3");
  game.load.audio("winAudio", "../assets/audio/Riverside-Ride-Pack/Riverside-Ride.mp3");
  game.load.audio("hit", "../assets/audio/toy_duck_rubber_squeeze_002.mp3");
}

function create() {
  //created background and make it scroll
  bg = game.add.tileSprite(0, 0, GAME_WIDTH, BG_HEIGHT, "bg");
  bg.autoScroll(-30, 0);

  //adds arena
  battleArena = game.add.tileSprite(ARENA_POS_X, ARENA_POS_Y, ARENA_WIDTH, ARENA_HEIGHT, "arena");
  battleArena.scale.setTo(ARENA_SCALE_X, ARENA_SCALE_Y);

  //set-up sounds and start background music
  music = game.add.audio("music");
  music.play(); //background music
  winAudio = game.add.audio("winAudio");
  hit = game.add.audio("hit");

  //attempt at creating all characters
  doux = game.add.sprite(PLAYER_ONE_INITIAL_POSITION_X, PLAYER_ONE_INITIAL_POSITION_Y, "douxSprite");
  console.log(doux);
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
    players[currentPlayer].animations.add("win" + players[currentPlayer].name, [0, 7], HALF_FRAME_SPEED, true);
    players[currentPlayer].animations.add("running" + players[currentPlayer].name, [17, 18, 19, 20, 21, 22, 23], FRAME_SPEED, true);
    players[currentPlayer].animations.play("idle" + players[currentPlayer].name);
    players[currentPlayer].anchor.setTo(HIT_BOX_SCALE); //Middle
    game.physics.arcade.enableBody(players[currentPlayer]);
    players[currentPlayer].body.width *= HIT_BOX_SCALE;
    players[currentPlayer].body.height *= HIT_BOX_SCALE;
  }
  //switches direction of one player
  players[0].scale.x *= SWITCH_DIRECTION;
}

function update() {
  if (winningState === false) {
    console.log(updateCount);
    console.log(players[0].body.position);
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

        //idle control
        if(!(game.input.keyboard.isDown(gameControls[currentPlayer][0])) 
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][1])) 
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][2])) 
          && !(game.input.keyboard.isDown(gameControls[currentPlayer][3]))) {
          players[currentPlayer].animations.play("idle" + players[currentPlayer].name);
        }
      }
    }
    
    //collision detection
    for(var firstCheck = 0; firstCheck < players.length; firstCheck++) {
      for(var secondCheck = 1; secondCheck < players.length; secondCheck++) {
        game.physics.arcade.collide(players[firstCheck], players[secondCheck], bounceCollision, null, this);
      }
      // if(players[firstCheck].body.position.x < OUT_OF_BOUNDS_X_LEFT 
      //   || players[firstCheck].body.position.x > OUT_OF_BOUNDS_X_RIGHT 
      //   || players[firstCheck].body.position.y > OUT_OF_BOUNDS_Y_TOP 
      //   || players[firstCheck].body.position.y < OUT_OF_BOUNDS_Y_BOTTOM) {
      //   loser = players[firstCheck];
      //   loses(loser);
      //   console.log("someone lost");
      // }
      if(arenaCollision(players[firstCheck], battleArena)) {
        loser = players[firstCheck];
        loses(loser);
        console.log("someone lost");
      }
    }

    updateCount++;
  }
}



document.getElementsByClassName("start-button")[0].addEventListener("click", startGame);