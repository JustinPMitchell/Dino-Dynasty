/*
//adds characters that fall off of arena to a losers array
//passes to wins when there is only one player left
*/
function loses(loser) {
  losers.push(loser);
  if(losers.length === (players.length - 1)) {
    wins();
  }
}

/*
//when there is only one player left wins is activated
//losers are animated, set velocity to 0, and repositioned to loser box
//winner is found by comparing to the loser list
//winner is animated, set velocity to 0, rotated, scaled, and moved to the left of the screen
//time is stopped and removed from screen
//stage stops rotation
//winning screens appear including reset button
//winner is set back to undefined and winningState is set to undefined
*/
function wins() {
  //loser animation
  losers[0].animations.play("death" + losers[0].name);
  losers[0].body.velocity.set(0);
  for(var loser = 0; loser < losers.length; loser++) {
    losers[loser].body.position.set(PLAYER_LOSING_POSITION_X, PLAYER_LOSING_POSITION_Y);
  }

  //find winner
  for(var checkWinner = 0; checkWinner < (players.length - 1); checkWinner++) {
    if(!(losers[checkWinner].name === players[checkWinner].name)) {
      winner = players[checkWinner];
      winner.wins++;
      document.body.getElementsByClassName("score-count")[checkWinner].textContent = winner.wins;
    }
  }
  //catches the case that last player is the winner
  if(winner === undefined) {
    winner = players[(players.length - 1)];
    winner.wins++;
    document.body.getElementsByClassName("score-count")[(players.length - 1)].textContent = winner.wins;
  }

  //winner animation
  winner.body.velocity.set(0);
  winner.animations.play("idle" + winner.name);
  winner.alpha = 0;

  //creates new sprite to animate
  winnerName = winner.name.toLowerCase() + "Sprite";
  winnerNew = game.add.sprite(PLAYER_WINNING_POSITION_X, PLAYER_WINNING_POSITION_Y, winnerName);
  winnerNew.animations.add("idle" + winnerName, [0, 1, 2], FRAME_SPEED, true);
  winnerNew.animations.play("idle" + winnerName);
  game.physics.arcade.enableBody(winnerNew);
  winnerNew.anchor.setTo(HIT_BOX_SCALE); //Middle
  winnerNew.body.width *= HIT_BOX_SCALE;
  winnerNew.body.height *= HIT_BOX_SCALE;
  winnerNew.angle = 90;
  winnerNew.scale.setTo(PLAYER_WINNING_SCALE, PLAYER_WINNING_SCALE);


  //high score
  if(localStorage.highScore === undefined) {
    localStorage.highScore = winner.wins;
  }
  else if(winner.wins > localStorage.highScore) {
    localStorage.highScore = winner.wins;
  }
  document.getElementsByClassName("high-score")[0].textContent = localStorage.highScore;

  //removes clock and stops stage rotation
  document.body.getElementsByClassName("time")[0].style.display = "none";
  clearInterval(rotateStage);
  clearInterval(rotateStageRight);
  clearInterval(rotateContinuous);
  stopTimer();

  //winning menu appears
  document.getElementsByClassName("current-winner")[0].textContent = winner.name;
  $(".winning-menu").fadeIn();
  document.getElementsByClassName("winner-title")[0].style.display = "inline";
  document.getElementsByClassName("current-winner")[0].style.display = "inline";
  document.getElementsByClassName("second-title")[0].style.display = "inline";
  document.getElementsByClassName("high-score-title")[0].style.display = "inline";
  document.getElementsByClassName("high-score")[0].style.display = "inline";
  document.getElementsByClassName("tie-title")[0].style.display = "none";
  winBg.revive();
  music.pause();
  winAudio.play();
  winningState = true;

  //restart winner
  winner = undefined;
}

/*
//if time runs out, tie gets activated
//all players are stunned and velocity set to 0
//winning state is set to true to stop updates
//time is removed
//winning menu appears
*/
function tie() {
  console.log("this is a tie");
  for(var ties = 0; ties < players.length; ties++) {
    players[ties].animations.play("death" + players[ties].name);
    players[ties].body.velocity.set(0);
  }

  //removes clock and stops stage rotation
  document.body.getElementsByClassName("time")[0].style.display = "none";
  clearInterval(rotateStage);
  clearInterval(rotateStageRight);
  clearInterval(rotateContinuous);
  stopTimer();

  //winning menu appears
  document.getElementsByClassName("winner-title")[0].style.display = "none";
  document.getElementsByClassName("current-winner")[0].style.display = "none";
  document.getElementsByClassName("second-title")[0].style.display = "none";
  document.getElementsByClassName("high-score-title")[0].style.display = "none";
  document.getElementsByClassName("high-score")[0].style.display = "none";
  document.getElementsByClassName("tie-title")[0].style.display = "inline";
  $(".winning-menu").fadeIn();
  winBg.revive();
  music.pause();
  loseAudio.play();
  winningState = true;
}