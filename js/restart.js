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

  console.log("This game was restarted.");
  winningState = false;
  $(".winning-menu").fadeOut();
  winBg.kill();

  //reset music
  winAudio.pause();
  music.play();

  //resets focus
  focusOne = {x:FOCUS_ONE_X, y:FOCUS_ONE_Y};
  focusTwo = {x:FOCUS_TWO_X, y:FOCUS_TWO_Y};

  //reset characters and animations  TODO(jmitchell 12/17): make for loop
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

  //resets timer
  initiateTimer = setInterval(startTimer, 1000);
  timer = TIMER_COUNT;


  //resets arena
  rightRectangle.reset(RIGHT_RECTANGLE_X, RIGHT_RECTANGLE_Y);
  leftRectangle.reset(LEFT_RECTANGLE_X, LEFT_RECTANGLE_Y ); //don't know why needs to be set lower??
  arena.reset(ARENA_POS_X, ARENA_POS_Y);
  arena.rotation = 0;
  rightRectangle.scale.setTo(RECTANGLE_SCALE_X, RECTANGLE_SCALE_Y);
  leftRectangle.scale.setTo(RECTANGLE_SCALE_X, RECTANGLE_SCALE_Y);
  rectangleScaler = 1;
}