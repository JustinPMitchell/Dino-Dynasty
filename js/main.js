console.log("this works");

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "gameDiv",
  {init:init, preload:preload, create:create, update:update});
var bg;
var music;
var player;
var playerR;
var battleArena;
var directionDoux = "left";
var directionMort = "right";
var updateCount = 0;
var winningState = false;
// document.getElementById("winner").style.display = "hidden";

function init(){
  game.enterKeyUp = true;
}

function preload() {
  //set physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //load image
  game.load.image("bg", "../assets/img/city.png")
  game.load.image("playerBlue", "../assets/img/dinoCharactersVersion1.1/gifs/DinoSprites_doux.gif");
  game.load.image("playerRed", "../assets/img/dinoCharactersVersion1.1/gifs/DinoSprites_mort.gif");
  game.load.image("arena", "../assets/img/yellow-gold-circle.png");

  //load spritesheets (animations)
  game.load.spritesheet("douxSprite", "../assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-doux.png", 24, 24, 24);
  game.load.spritesheet("mortSprite", "../assets/img/dinoCharactersVersion1.1/sheets/DinoSprites-mort.png", 24, 24, 24);
  //load audio
  game.load.audio("music", "../assets/audio/one_0.mp3");
}

function create() {
  //created background and make it scroll
  bg = game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "bg");
  bg.autoScroll(-30, 0);

  //adds arena
  battleArena = game.add.tileSprite(ARENA_POS_X, ARENA_POS_Y, ARENA_WIDTH, ARENA_HEIGHT, "arena");
  console.log(battleArena);
  battleArena.scale.setTo(2, 1.25);

  //set-up sounds and start background music
  music = game.add.audio("music");
  music.play(); //background music

  //create doux
  doux = game.add.sprite(ARENA_POS_X + (2 * ARENA_WIDTH) - 50, ARENA_POS_Y + (0.5 * ARENA_HEIGHT), "douxSprite");
  doux.scale.setTo(3, 3);
  doux.animations.add("idleDoux", [0, 1, 2], 12, true);
  doux.animations.add("walkDoux", [3, 4, 5, 6, 7, 8], 12, true);
  doux.animations.add("deathDoux", [13, 14], 12, true);
  doux.animations.add("winDoux", [0, 7], 6, true);
  doux.animations.play("idleDoux");
  doux.anchor.setTo(0.5); //Middle
  game.physics.arcade.enableBody(doux);
  doux.body.bounce.set(1);
  doux.body.collideWorldBounds = true;
  doux.scale.x *= -1;
  doux.body.width *= HIT_BOX_SCALE;
  doux.body.height *= HIT_BOX_SCALE;

  //create mort
  mort = game.add.sprite(ARENA_POS_X + 50, ARENA_POS_Y + (0.5 * ARENA_HEIGHT), "mortSprite");
  mort.scale.setTo(3, 3);
  mort.animations.add("idleMort", [0, 1, 2], 12, true);
  mort.animations.add("walkMort", [3, 4, 5, 6, 7, 8], 12, true);
  mort.animations.add("deathMort", [13, 14], 12, true);
  mort.animations.add("winMort", [0, 7], 6, true);
  mort.animations.play("idleMort");
  mort.anchor.setTo(0.5); //Middle
  game.physics.arcade.enableBody(mort);
  mort.body.bounce.set(1);
  mort.body.collideWorldBounds = true;  
  mort.body.width *= HIT_BOX_SCALE;
  mort.body.height *= HIT_BOX_SCALE;
  //keyboard listeners
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  if (winningState === false) {
    if (updateCount > 5) {
      doux.body.velocity.set(0); //stop the player if an arrow key isn't down
      mort.body.velocity.set(0);

      //keyboard detection Doux
      if(cursors.left.isDown) {
        if(directionDoux === "right") {
          doux.scale.x *= -1;
        }

        directionDoux = "left";
        doux.body.velocity.x = -PLAYER_SPEED;
        doux.animations.play("walkDoux");
      } 
      else if(cursors.right.isDown) {
        if(directionDoux === "left") {
          doux.scale.x *= -1;
        }

        directionDoux = "right";

        doux.body.velocity.x = PLAYER_SPEED;
        doux.animations.play("walkDoux");
      }

      if(cursors.up.isDown) {
        doux.body.velocity.y = -PLAYER_SPEED;
        doux.animations.play("walkDoux");
      }
      else if(cursors.down.isDown) {
        doux.body.velocity.y = PLAYER_SPEED;
        doux.animations.play("walkDoux");
      }

      if(cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp) {
        doux.animations.play("idleDoux");
      }

      //keyboard detection Mort
      if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        if(directionMort === "right") {
          mort.scale.x *= -1;
        }

        directionMort = "left";
        mort.body.velocity.x = -PLAYER_SPEED;
        mort.animations.play("walkMort");
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        if(directionMort === "left") {
          mort.scale.x *= -1;
        }

        directionMort = "right";

        mort.body.velocity.x = PLAYER_SPEED;
        mort.animations.play("walkMort");
      }

      if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        mort.body.velocity.y = -PLAYER_SPEED;
        mort.animations.play("walkMort");
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        mort.body.velocity.y = PLAYER_SPEED;
        mort.animations.play("walkMort");
      }

      if(!(game.input.keyboard.isDown(Phaser.Keyboard.A)) && !(game.input.keyboard.isDown(Phaser.Keyboard.D)) && !(game.input.keyboard.isDown(Phaser.Keyboard.W)) && !(game.input.keyboard.isDown(Phaser.Keyboard.S))) {
        mort.animations.play("idleMort");
      }
    }
    //collision detection
    game.physics.arcade.collide(doux, mort, bounceCollision, null, this);
    updateCount++;
  }
  //kills characters when out of arena
  if(doux.body.position.x < (ARENA_POS_X - 50) || doux.body.position.x > (ARENA_POS_X + (2 * ARENA_WIDTH) + 50) || doux.body.position.y > (ARENA_POS_Y + (2 * ARENA_HEIGHT)) || doux.body.position.y < (ARENA_POS_Y)) {
    mortWins();
  }
  if(mort.body.position.x < (ARENA_POS_X - 50) || mort.body.position.x > (ARENA_POS_X + (2 * ARENA_WIDTH) + 50) || mort.body.position.y > (ARENA_POS_Y + (2 * ARENA_HEIGHT)) || mort.body.position.y < (ARENA_POS_Y)) {
    douxWins();
  }

 
}

startTimer(180, document.body.getElementsByClassName('time')[0]);