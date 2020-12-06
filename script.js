'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//starting element

let currentScore, score, activeplayer, playing;
const init = function () {
  currentScore = 0;
  score = [0, 0];
  activeplayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
};
init();
//create function switch player
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//dice roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check one if true switch to next player
    if (dice !== 1) {
      //add dice to current player
      currentScore += dice;
      document.getElementById(
        `current--${activeplayer}`
      ).textContent = currentScore; //chnage later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
//holding the current score
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player
    score[activeplayer] += currentScore;
    //
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];
    //check if score is more than 100 or not
    if (score[activeplayer] >= 100) {
      //finish the game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
//reset button
btnNew.addEventListener('click', init);
