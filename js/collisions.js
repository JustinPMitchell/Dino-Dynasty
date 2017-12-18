/*
//changes count to stun characters
//calculates how characters should react to collision
//characters bounce in opposite direction
*/
function bounceCollision(player1, player2) {
  updateCount = 0;
  //calculates direction of bounce after collision
  var xDiff = player2.position.x - player1.position.x;
  var yDiff = player2.position.y - player1.position.y;
  var distance = Math.sqrt(((xDiff) * (xDiff)) + ((yDiff) * (yDiff)));
  var xScaler = (xDiff) / distance;
  var yScaler = (yDiff) / distance;

  //velocity bounce back
  player1.body.velocity.x = -COLLISION_VELOCITY * xScaler;  
  player2.body.velocity.x = COLLISION_VELOCITY * xScaler;
  player1.body.velocity.y = -COLLISION_VELOCITY * yScaler;
  player2.body.velocity.y = COLLISION_VELOCITY * yScaler;
  hit.play();
}

/*
//calculates if character is off of arena
//if character is off of arena, passes to loses
*/
function arenaCollision(player, arena) {
  //calculates the distance the character is from te foci
  var calculatedDistance = (Math.sqrt((((player.position.x) - (focusOne.x)) * ((player.position.x) - (focusOne.x)))
                                     + (((player.position.y) - (focusOne.y)) * ((player.position.y) - (focusOne.y)))))
                            + (Math.sqrt((((player.position.x) - (focusTwo.x)) * ((player.position.x) - (focusTwo.x)))
                                     + (((player.position.y) - (focusTwo.y)) * ((player.position.y) - (focusTwo.y)))));

  //if distance is greater than the arena's border from the foci, then the character is added to the losers array
  if(calculatedDistance > TOTAL_DISTANCE_FROM_FOCI) {
    console.log(player.name + "loses");
    loses(player);
  }
}

/*
//if character is hit by a kick, calculates how players should react to collision
//kicked players velocity is changed
//kicker players velocity is set to 0
*/
function kickCollision(player1, player2) {
  updateCount = 0;
  //calculates direction of bounce after collision
  var xDiff = player2.position.x - player1.position.x;
  var yDiff = player2.position.y - player1.position.y;
  var distance = Math.sqrt(((xDiff) * (xDiff)) + ((yDiff) * (yDiff)));
  var xScaler = (xDiff) / distance;
  var yScaler = (yDiff) / distance;

  //sets velocity bounce back for kicked
  player1.body.velocity.x = 0;
  player2.body.velocity.x = KICKED_VELOCITY * xScaler;
  player1.body.velocity.y = 0;
  player2.body.velocity.y = KICKED_VELOCITY * yScaler;
  hit.play();
}