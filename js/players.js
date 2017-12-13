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

function arenaCollision(player, arena) {
  console.log("player x pos: " + player.position.x);
  console.log("arena x no width: " + (arena.position.x))
  console.log("arena x: " + (arena.position.x + ((arena.width)/2)));
  console.log("player y pos: " + player.position.y);
  console.log("arena y: " + (arena.position.y + ((arena.height)/2)));
  var xDiff = (arena.position.x + ((arena.width)/2)) - player.position.x;
  var yDiff = (arena.position.y + ((arena.height)/2)) - player.position.y;
  //console.log("the dif in x: " + xDiff);
  //console.log("the dif in y: " + yDiff);
  //distance between player and arena
  var distance = Math.sqrt(((xDiff) * (xDiff)) + ((yDiff) * (yDiff)));
  //console.log("this is the distance: " + distance);
  var angle = Math.atan((yDiff)/(xDiff));
  //console.log("this is the angle " + angle);
  xComponent = (arena.width / 2) * Math.cos(angle);
  yComponent = (arena.height / 2) * Math.sin(angle);
  //console.log("This is the xcomp " + xComponent);
  //console.log("This is the ycomp " + yComponent);
  radiusArena = Math.sqrt(((xComponent) * (xComponent)) + ((yComponent) * (yComponent)));
  //console.log("This is the radius of the ellipse " + radiusArena);

  if(xComponent > 0 && xDiff > xComponent) {
    console.log("this got triggered");
    return true;
  } else if(xComponent < 0 && xDiff < xComponent) {
    return true;
  } else if(yComponent > 0 && yDiff > yComponent) {
    return true;
  } else if(yComponent < 0 && yDiff < yComponent) {
    return true;
  } else {
    return false;
  }

}
