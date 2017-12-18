/*
//stuns all characters when count is updated
*/
function stun() {
  for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++) {
    players[currentPlayer].animations.play("death" + players[currentPlayer].name);
    players[currentPlayer].body.velocity.set(0);
  }
  updateCount++;
}

/*
//sets each players controls based of an array of controls and an array of characters
//allows players to move up, down, left, and right
//allows players to kick
//manages when characters are not moving
*/
function controls() {
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

/*
//speeds up kicker
//finds a list of possible kicked characters
//if character is kicked, passes to kickCollision
*/
function kick(kicker) {
  //speeds character up to give a push
  if (kicker.scale.x > 0) {
    kicker.body.velocity.x = KICKER_VELOCITY;
  }
  else {
     kicker.body.velocity.x = -KICKER_VELOCITY;
  }

  //lists those that are kicked
  var kicked = [];
  for (var i = 0; i < players.length; i++){
    if (kicker.name !== players[i].name) {
      kicked.push(players[i]);
    }
  }

  //passes to kickCollision if there is a collision
  for (var i = 0; i < kicked.length; i++) {
    if(game.physics.arcade.collide(kicker, kicked[i])) {
      game.physics.arcade.collide(kicker, kicked[i], kickCollision(kicker, kicked[i]), null, this);
      console.log("this is who was kicked " + kicked[i].name);
    }
  }
}


