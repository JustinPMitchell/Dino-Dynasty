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
    }
  }
  //catches the case last player is winner
  if(winner === undefined) {
    winner = players[(players.length - 1)]
  }

  //winner animation
  winner.body.velocity.set(0);
  winner.animations.play("win" + winner.name);
  winner.body.position.set(ARENA_POS_X + ARENA_WIDTH + 50, ARENA_POS_Y);
  document.getElementById("winner").style.display = "inline";
  music.pause();
  winAudio.play();
  winningState = true;

  //other things
  document.body.getElementsByClassName('time')[0].style.display = "none";

  //add restart button
  $("#gameDiv").append("<button>Restart</button>");
  document.getElementsByTagName("button")[1].className = "restart";
  document.getElementsByClassName("restart")[0].addEventListener("click", restart);
  //startGame();
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
}