console.log("this is the players");

function bounceCollision(player1, player2) {
  console.log("players collided");
  updateCount = 0;
  console.log("player1 x pos: " + player1.position.x);
  console.log("player2 x pos: " + player2.position.x);
  var xDiff = player2.position.x - player1.position.x;
  var yDiff = player2.position.y - player1.position.y;
  console.log("the dif in x: " + xDiff);
  console.log("the dif in y: " + yDiff);
  var distance = Math.sqrt(((xDiff) * (xDiff)) + ((yDiff) * (yDiff)));
  console.log("this is the distance: " + distance);
  var xScaler = (xDiff) / distance;
  var yScaler = (yDiff) / distance;
  console.log("this is the xScaler: " + xScaler);
  console.log("this is the yScaler: " + yScaler);
  player1.body.velocity.x = -700 * xScaler;  //sets velocity bounce back
  player2.body.velocity.x = 700 * xScaler;
  player1.body.velocity.y = -700 * yScaler;
  player2.body.velocity.y = 700 * yScaler;
}
