/*
//shows random firework
//creates random position
//plays noise
//ends firework after complete animation
*/
function firework() {
  var randomNumber = Math.round(Math.random() * FIREWORK_RANDOM_NUMBER);

  if (randomNumber === 0 || randomNumber === 1) {
    yellowFirework.position.x = (Math.round(Math.random() * FIREWORK_POS_X_MULTIPLIER)) - FIREWORK_POS_X_SUBTRACTOR;
    yellowFirework.position.y = Math.round(Math.random() * FIREWORK_POS_Y_MULTIPLIER) - FIREWORK_POS_Y_SUBTRACTOR;
    yellowFirework.revive();
    yellowFirework.animations.play("yellowPop");
    fireworkBang.play();
    setTimeout(function() {yellowFirework.kill(); yellowFirework.animations.stop("yellowPop", true);}, FIREWORK_TIME);
  }
  else if (randomNumber === 2) {
    redFirework.position.x = (Math.round(Math.random() * FIREWORK_POS_X_MULTIPLIER)) - FIREWORK_POS_X_SUBTRACTOR;
    redFirework.position.y = Math.round(Math.random() * FIREWORK_POS_Y_MULTIPLIER) - FIREWORK_POS_Y_SUBTRACTOR;
    redFirework.revive();
    redFirework.animations.play("redPop");
    fireworkBang.play();
    setTimeout(function() {redFirework.kill(); redFirework.animations.stop("redPop", true);}, FIREWORK_TIME);
  }
  else if (randomNumber === 3) {
    blueFirework.position.x = (Math.round(Math.random() * FIREWORK_POS_X_MULTIPLIER)) - FIREWORK_POS_X_SUBTRACTOR;
    blueFirework.position.y = Math.round(Math.random() * FIREWORK_POS_Y_MULTIPLIER) - FIREWORK_POS_Y_SUBTRACTOR;
    blueFirework.revive();
    blueFirework.animations.play("bluePop");
    fireworkBang.play();
    setTimeout(function() {blueFirework.kill(); blueFirework.animations.stop("bluePop", true);}, FIREWORK_TIME);
  }
}