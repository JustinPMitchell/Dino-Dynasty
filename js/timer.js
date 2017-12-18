/*
//displays time
//manages ties when time runs out
//starts and stops rotation
*/
function startTimer() {
  document.getElementsByClassName('time')[0].style.display = "inline";
  minutes = parseInt(timer / 60, 10)
  seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.body.getElementsByClassName('time')[0].textContent = minutes + ":" + seconds;

  if (--timer < 0) {
      timer = duration;
  }
  else if (timer === 0) {
    tie();
  }
  else if (timer === 59) {
    rotateStage = setInterval(scaleRotate, 1);
  }
  else if (timer === 57) {
    clearInterval(rotateStage);
  }
  else if (timer === 53) {
    rotateStageRight = setInterval(scaleRotateRight, 1);
  }
  else if(timer === 51) {
    clearInterval(rotateStageRight);
  }
  else if (timer === 49) {
    rotateStageRight = setInterval(scaleRotateRight, 1);
  }
  else if (timer === 47) {
    clearInterval(rotateStageRight);
  }
  else if (timer === 43) {
    rotateStage = setInterval(scaleRotate, 1);
  }
  else if (timer === 41) {
    clearInterval(rotateStage);
  }
  else if (timer === 30) {
    rotateContinuous = setInterval(rotateLeftWithoutRectangles, 1);
  }
}

/*
//stops timer
*/
function stopTimer() {
  clearInterval(initiateTimer);
}