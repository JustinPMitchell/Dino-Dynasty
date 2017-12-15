console.log("this is the helper functions");
var timer = TIMER_COUNT, minutes, seconds;
//Timer for game
function startTimer(duration, display) {
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        else if (timer === 0) {
          tie();
        }
        else if (timer === 59) {
          stageRotate();
        }
        else if (timer === 57) {
          clearInterval(myVar);
        }
    }, 1000);
}

function firework() {
  var randomNumber = Math.round(Math.random() * 500);
  //console.log("this is the random number " + randomNumber);

  if (randomNumber === 30 || randomNumber === 40) {
    yellowFirework.position.x = (Math.round(Math.random() * 1000)) - 150;
    yellowFirework.position.y = Math.round(Math.random() * 200) - 50;
    yellowFirework.revive();
    yellowFirework.animations.play("yellowPop");
    setTimeout(function() {yellowFirework.kill(); yellowFirework.animations.stop("yellowPop", true);}, 800);
  }
  else if (randomNumber === 50) {
    redFirework.position.x = (Math.round(Math.random() * 1000)) - 100;
    redFirework.position.y = Math.round(Math.random() * 200) - 50;
    redFirework.revive();
    redFirework.animations.play("redPop");
    setTimeout(function() {redFirework.kill(); redFirework.animations.stop("redPop", true);}, 800);
  }
  else if (randomNumber === 80) {
    blueFirework.position.x = (Math.round(Math.random() * 1000)) - 100;
    blueFirework.position.y = Math.round(Math.random() * 200) - 50;
    blueFirework.revive();
    blueFirework.animations.play("bluePop");
    setTimeout(function() {blueFirework.kill(); blueFirework.animations.stop("bluePop", true);}, 800);
  }
}

function stageRotate() {
  myVar = setInterval(scaleRotate, 1);

}

function scaleRotate() {
  battleArena.rotation += .0008;
  rectangle1.scale.x /= k;
  rectangle2.scale.x /= k;
  rectangle1.scale.y /= (k * 1.003); //shrinks right rectangle height
  rectangle2.scale.y *= (k * 1.0018); //expands left rectangle height
  k += .00000075;
  console.log("this is the angle: " + battleArena.rotation);
  console.log("this is the arena pos y: " + battleArena.y);
  console.log("this is the distance from the focix: " + (TOTAL_DISTANCE_FROM_FOCI * Math.cos(battleArena.rotation)));
  console.log("this is f1x position, i think... " + ((((TOTAL_DISTANCE_FROM_FOCI * Math.cos(battleArena.rotation))) + battleArena.x) - 398));
  console.log("this is f1y position, i think... " + ((((TOTAL_DISTANCE_FROM_FOCI * Math.sin(battleArena.rotation))) + battleArena.y) - 3));

    console.log("this is f2x position, i think... " + ((battleArena.x - ((TOTAL_DISTANCE_FROM_FOCI * Math.cos(battleArena.rotation)))) - 398));
  console.log("this is f2y position, i think... " + ((((TOTAL_DISTANCE_FROM_FOCI * Math.sin(battleArena.rotation))) + battleArena.y) - 3));
}