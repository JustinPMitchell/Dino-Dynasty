console.log("this is the scores");

function douxWins() {
  mort.animations.play("deathMort");
  mort.body.velocity.set(0);
  doux.body.velocity.set(0);
  doux.animations.play("winDoux");
  doux.body.position.set(ARENA_POS_X + ARENA_WIDTH - 20, ARENA_POS_Y + 50);
  document.getElementById("winner").style.display = "inline";
  console.log("winner");
  music.pause();
  winningState = true;
}

function mortWins() {
  doux.animations.play("deathDoux");
  doux.body.velocity.set(0);
  mort.body.velocity.set(0);
  mort.animations.play("winMort");
  mort.body.position.set(ARENA_POS_X + ARENA_WIDTH - 20, ARENA_POS_Y + 50);
  document.getElementById("winner").style.display = "inline";
  console.log("winner");
  music.pause();
  winningState = true;
}