console.log("this is the players");

//basic collision
function bounceCollision(player1, player2) {
  //console.log("players collided");
  updateCount = 0;
  //console.log("player1 x pos: " + player1.position.x);
  //console.log("player2 x pos: " + player2.position.x);
  var xDiff = player2.position.x - player1.position.x;
  var yDiff = player2.position.y - player1.position.y;
  //console.log("the dif in x: " + xDiff);
  //console.log("the dif in y: " + yDiff);
  var distance = Math.sqrt(((xDiff) * (xDiff)) + ((yDiff) * (yDiff)));
  //console.log("this is the distance: " + distance);
  var xScaler = (xDiff) / distance;
  var yScaler = (yDiff) / distance;
  //console.log("this is the xScaler: " + xScaler);
  //console.log("this is the yScaler: " + yScaler);
  player1.body.velocity.x = -COLLISION_VELOCITY * xScaler;  //sets velocity bounce back
  player2.body.velocity.x = COLLISION_VELOCITY * xScaler;
  player1.body.velocity.y = -COLLISION_VELOCITY * yScaler;
  player2.body.velocity.y = COLLISION_VELOCITY * yScaler;
  hit.play();
  
}

//trys to detect if player is off of elliptical board
function arenaCollision(player, arena) {
  //an attempt with foci
  var calculatedDistance = (Math.sqrt((((player.position.x) - (FOCUS_ONE_X)) * ((player.position.x) - (FOCUS_ONE_X)))
                                     + (((player.position.y) - (FOCUS_ONE_Y)) * ((player.position.y) - (FOCUS_ONE_Y)))))
                            + (Math.sqrt((((player.position.x) - (FOCUS_TWO_X)) * ((player.position.x) - (FOCUS_TWO_X)))
                                     + (((player.position.y) - (FOCUS_TWO_Y)) * ((player.position.y) - (FOCUS_TWO_Y)))));

  if(calculatedDistance > TOTAL_DISTANCE_FROM_FOCI) {
    console.log(player.name + "loses");
    loses(player);
  }
}

//kicks
function kick(kicker) {
  //speeds character up to give a push
  if (kicker.scale.x > 0) {
    kicker.body.velocity.x = COLLISION_VELOCITY * 2;
  }
  else {
     kicker.body.velocity.x = -COLLISION_VELOCITY * 2;
  }

  var kicked = [];
  console.log("this is the kicker: " + kicker.name);
  for (var i = 0; i < players.length; i++){
    if (kicker.name !== players[i].name) {
      kicked.push(players[i]);
    }
  }
  console.log("this is who was kicked " + kicked[0].name);
  for (var i = 0; i < kicked.length; i++) {
    //console.log("dino was kicked: " + game.physics.arcade.collide(kicker, kicked[i]));

    // if(game.physics.arcade.collide(kicker, kicked[i])) {
    //   console.log("THIS GUY KICKED ME!");
    // }
    // game.physics.arcade.collide(players[firstCheck], players[secondCheck], bounceCollision, null, this);
    game.physics.arcade.collide(kicker, kicked[i], kickCollision, null, this);
  }
}

//basic collision
function kickCollision(player1, player2) {
  updateCount = 0;
  console.log("THIS GUY KICKED ME!");
  //console.log("player1 x pos: " + player1.position.x);
  //console.log("player2 x pos: " + player2.position.x);
  var xDiff = player2.position.x - player1.position.x;
  var yDiff = player2.position.y - player1.position.y;
  //console.log("the dif in x: " + xDiff);
  //console.log("the dif in y: " + yDiff);
  var distance = Math.sqrt(((xDiff) * (xDiff)) + ((yDiff) * (yDiff)));
  //console.log("this is the distance: " + distance);
  var xScaler = (xDiff) / distance;
  var yScaler = (yDiff) / distance;
  //console.log("this is the xScaler: " + xScaler);
  //console.log("this is the yScaler: " + yScaler);
  player1.body.velocity.x = 0;  //sets velocity bounce back
  player2.body.velocity.x = COLLISION_VELOCITY * xScaler * 2;
  player1.body.velocity.y = 0;
  player2.body.velocity.y = COLLISION_VELOCITY * yScaler * 2;
  hit.play();
  
}
