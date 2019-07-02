/*
//rotates arena and scales rectangles to appear like a 3d shift
//shifts foci of ellipse
*/  
function scaleRotate() {
  //changes battle arena rotation
  arena.rotation += STAGE_ROTATION;
  rightRectangle.scale.x /= (rectangleScaler * RIGHT_RECTANGLE_WIDTH_SCALER);
  leftRectangle.scale.x /= (rectangleScaler * LEFT_RECTANGLE_WIDTH_SCALER);
  rightRectangle.scale.y /= (rectangleScaler * RIGHT_RECTANGLE_HEIGHT_SCALER); //shrinks right rectangle height
  leftRectangle.scale.y *= (rectangleScaler * LEFT_RECTANGLE_HEIGHT_SCALER); //expands left rectangle height
  rectangleScaler += RECTANGLE_SCALER_SCALER;

  //handles rotation of foci
  var dir = {x:0, y:0};
  dir.x = focusOne.x - ARENA_CENTER_X;
  dir.y = focusOne.y - ARENA_CENTER_Y;

  focusOne.x = dir.x * Math.cos(STAGE_ROTATION) - dir.y * Math.sin(STAGE_ROTATION);
  focusOne.y = dir.x * Math.sin(STAGE_ROTATION) + dir.y * Math.cos(STAGE_ROTATION);

  focusOne.x += ARENA_CENTER_X;
  focusOne.y += ARENA_CENTER_Y;

  dir.x = focusTwo.x - ARENA_CENTER_X;
  dir.y = focusTwo.y - ARENA_CENTER_Y;

  focusTwo.x = dir.x * Math.cos(STAGE_ROTATION) - dir.y * Math.sin(STAGE_ROTATION);
  focusTwo.y = dir.x * Math.sin(STAGE_ROTATION) + dir.y * Math.cos(STAGE_ROTATION);

  focusTwo.x += ARENA_CENTER_X;
  focusTwo.y += ARENA_CENTER_Y;
}


/*
//rotates arena right and scales rectangles to appear like a 3d shift right
//shifts foci of ellipse right
*/  
function scaleRotateRight() {
  //changes battle arena rotation
  arena.rotation -= STAGE_ROTATION;
    // rightRectangle.scale.x *= rectangleScaler * .99955;
  rightRectangle.scale.x *= rectangleScaler;
  leftRectangle.scale.x *= rectangleScaler;
    // rightRectangle.scale.y *= (rectangleScaler * RIGHT_RECTANGLE_HEIGHT_SCALER * .9997); //shrinks right rectangle height
  rightRectangle.scale.y *= (rectangleScaler * RIGHT_RECTANGLE_HEIGHT_SCALER); //shrinks right rectangle height
  leftRectangle.scale.y /= (rectangleScaler * LEFT_RECTANGLE_HEIGHT_SCALER); //expands left rectangle height
    // rightRectangle.position.x += .08; //repositions rectangle to overcorrect
  rectangleScaler -= RECTANGLE_SCALER_SCALER;

  //handles rotation of foci
  var dir = {x:0, y:0};
  dir.x = focusOne.x - ARENA_CENTER_X;
  dir.y = focusOne.y - ARENA_CENTER_Y;

  focusOne.x = dir.x * Math.cos(-STAGE_ROTATION) - dir.y * Math.sin(-STAGE_ROTATION);
  focusOne.y = dir.x * Math.sin(-STAGE_ROTATION) + dir.y * Math.cos(-STAGE_ROTATION);

  focusOne.x += ARENA_CENTER_X;
  focusOne.y += ARENA_CENTER_Y;

  dir.x = focusTwo.x - ARENA_CENTER_X;
  dir.y = focusTwo.y - ARENA_CENTER_Y;

  focusTwo.x = dir.x * Math.cos(-STAGE_ROTATION) - dir.y * Math.sin(-STAGE_ROTATION);
  focusTwo.y = dir.x * Math.sin(-STAGE_ROTATION) + dir.y * Math.cos(-STAGE_ROTATION);

  focusTwo.x += ARENA_CENTER_X;
  focusTwo.y += ARENA_CENTER_Y;
}

/*
//rotates arena left
//shifts foci of ellipse left
//removes rectangles
*/  
function rotateLeftWithoutRectangles() {
  //changes battle arena rotation
  arena.rotation += (STAGE_ROTATION * 2);
  rightRectangle.position.y += .3; //shrinks right rectangle height
  leftRectangle.position.y += .3; //expands left rectangle height
  rectangleScaler += RECTANGLE_SCALER_SCALER;

  //handles rotation of foci
  var dir = {x:0, y:0};
  dir.x = focusOne.x - ARENA_CENTER_X;
  dir.y = focusOne.y - ARENA_CENTER_Y;

  focusOne.x = dir.x * Math.cos(STAGE_ROTATION * 2) - dir.y * Math.sin(STAGE_ROTATION * 2);
  focusOne.y = dir.x * Math.sin(STAGE_ROTATION * 2) + dir.y * Math.cos(STAGE_ROTATION * 2);

  focusOne.x += ARENA_CENTER_X;
  focusOne.y += ARENA_CENTER_Y;

  dir.x = focusTwo.x - ARENA_CENTER_X;
  dir.y = focusTwo.y - ARENA_CENTER_Y;

  focusTwo.x = dir.x * Math.cos(STAGE_ROTATION * 2) - dir.y * Math.sin(STAGE_ROTATION * 2);
  focusTwo.y = dir.x * Math.sin(STAGE_ROTATION * 2) + dir.y * Math.cos(STAGE_ROTATION * 2);

  focusTwo.x += ARENA_CENTER_X;
  focusTwo.y += ARENA_CENTER_Y;
}