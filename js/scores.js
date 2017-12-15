console.log("this is the scores");

function wins() {
  //loser animation
  console.log("these are the losers " + losers[0].name);
  losers[0].animations.play("death" + losers[0].name);
  losers[0].body.velocity.set(0);

  //find winner
  for(var checkWinner = 0; checkWinner < (players.length - 1); checkWinner++) {
    console.log(losers[checkWinner]);
    console.log(players[checkWinner]);
    if(!(losers[checkWinner].name === players[checkWinner].name)) {
      winner = players[checkWinner];
      winner.wins++;
      document.body.getElementsByClassName("score-count")[checkWinner].textContent = winner.wins;
    }
  }
  //catches the case last player is winner
  if(winner === undefined) {
    winner = players[(players.length - 1)];
      winner.wins++;
      document.body.getElementsByClassName("score-count")[(players.length - 1)].textContent = winner.wins;
  }

  //winner animation
  winner.body.velocity.set(0);
  winner.animations.play("idle" + winner.name);
  winner.body.position.set(ARENA_POS_X - 100, ARENA_POS_Y);
  winner.scale.setTo(15, 15);
  winner.angle = 90;
  music.pause();
  winAudio.play();
  winningState = true;

  //loser animation
  for(var loser = 0; loser < losers.length; loser++) {
    losers[loser].body.position.set(800, 210);
  }

  //high score
  if(localStorage.highScore === undefined) {
    localStorage.highScore = winner.wins;
  }
  else if(winner.wins > localStorage.highScore) {
    localStorage.highScore = winner.wins;
  }
  document.getElementsByClassName("high-score")[0].textContent = localStorage.highScore;

  //other things
  document.body.getElementsByClassName("time")[0].style.display = "none";
  document.getElementsByClassName("current-winner")[0].textContent = winner.name;

  //restart
  $(".winning-menu").fadeIn();
  winBg.revive();
  console.log("this is the winner: " + winner.name);
  console.log("this is the winners wins count: " + winner.wins);
  winner = undefined;
}

function loses(loser) {
  losers.push(loser);
  if(losers.length === (players.length - 1)) {
    wins();
  }
}

function tie() {
  console.log("this is a tie");
  for(var ties = 0; ties < players.length; ties++) {
    players[ties].animations.play("death" + players[ties].name);
    players[ties].body.velocity.set(0);
    winningState = true;
    document.body.getElementsByClassName('time')[0].style.display = "none";
  }
  //other things
  document.body.getElementsByClassName("time")[0].style.display = "none";

  //restart
  $(".winning-menu").fadeIn();
  winBg.revive();
}