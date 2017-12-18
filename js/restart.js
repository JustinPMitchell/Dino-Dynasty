function instructions() {
  $(".instructions").fadeIn();
}

function exitInstructions() {
  $(".instructions").fadeOut();
}

/*
//changes winningState
//removes winning menu
//resets music
//resets focus
//resets characters
//resets timer
//resets arena
*/
function restart() {
  clearInterval(rotateStage);
  clearInterval(rotateStageRight);
  clearInterval(rotateContinuous);

  console.log("This game was restarted.");
  winningState = false;
  $(".winning-menu").fadeOut();
  winBg.kill();

  //reset music
  winAudio.pause();
  music.play();
  countDown.play();
  setTimeout(function() {countDown.play();}, 1000);
  setTimeout(function() {countDown.play();}, 2000);
  setTimeout(function() {countDownStart.play();}, 3000);

  //resets focus
  focusOne = {x:FOCUS_ONE_X, y:FOCUS_ONE_Y};
  focusTwo = {x:FOCUS_TWO_X, y:FOCUS_TWO_Y};

  //reset characters and animations  TODO(jmitchell 12/17): make for loop
  players[0].position.setTo(PLAYER_ONE_INITIAL_POSITION_X, PLAYER_ONE_INITIAL_POSITION_Y);
  players[1].position.setTo(PLAYER_TWO_INITIAL_POSITION_X, PLAYER_TWO_INITIAL_POSITION_Y);
  players[0].alpha = 1;
  players[1].alpha = 1;
  winnerNew.kill();

  if (players[0].scale.x > 0) {
    players[0].scale.x *= SWITCH_DIRECTION;
  }
  if (players[1].scale.x < 0) {
    players[1].scale.x *= SWITCH_DIRECTION;
  }

  losers = [];
  updateCount = 0;

  //resets timer
  timer = TIMER_COUNT;
  countDownSprite.revive();
  countDownSprite.animations.play("countingDown");

  //resets arena
  rightRectangle.reset(RIGHT_RECTANGLE_X, RIGHT_RECTANGLE_Y);
  leftRectangle.reset(LEFT_RECTANGLE_X - 14, LEFT_RECTANGLE_Y); //adjusts for reset
  arena.reset(ARENA_POS_X, ARENA_POS_Y);

  rightRectangle.width = ARENA_WIDTH;
  rightRectangle.height = ARENA_HEIGHT;
  leftRectangle.width = ARENA_WIDTH - 19; //adjusts for reset
  leftRectangle.height = ARENA_HEIGHT;

  arena.rotation = 0;
  rightRectangle.scale.setTo(RECTANGLE_SCALE_X, RECTANGLE_SCALE_Y);
  leftRectangle.scale.setTo(RECTANGLE_SCALE_X, RECTANGLE_SCALE_Y);
  rectangleScaler = 1;
}