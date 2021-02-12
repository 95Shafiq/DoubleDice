var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn--roll').addEventListener('click', function(){
	if(gamePlaying){
		var dice = Math.floor(Math.random() * 6) + 1;
	
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';

		diceDOM.src = 'dice-' + dice + '.png';
		if (dice === 6 && lastDice === 6){
			scores[activePlayer] = 0;
			document.getElementById('score--' + activePlayer).textContent= scores[activePlayer];
			nextPlayer();
		}
		if (dice !== 1){
			roundScore += dice;
			document.querySelector('#current--' + activePlayer).textContent = roundScore;

		} else {
			nextPlayer();
		}
		lastDice = dice;
	}
});

document.querySelector('.btn--hold').addEventListener('click', function(){
	if(gamePlaying){
		scores[activePlayer] += roundScore;
		document.getElementById('score--' + activePlayer).textContent= scores[activePlayer];
		var input = document.querySelector('.final--score').value;
		var winningScore;
		
		if (input){
			winningScore = input;
		} else {
			winningScore = 100;
		}
		if (scores[activePlayer] >= winningScore) {
			document.getElementById('name--' + activePlayer).textContent = 'WINNER!!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player--' + activePlayer).classList.add('player--winner');
			document.querySelector('.player--' + activePlayer).classList.remove('player--active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}	
	}	
});

document.querySelector('.btn--new').addEventListener('click', init);

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current--0').textContent = 0;
	document.getElementById('current--1').textContent = 0;

	document.querySelector('.player--0').classList.toggle('player--active');
	document.querySelector('.player--1').classList.toggle('player--active');

	document.querySelector('.dice').style.display = 'none';
};

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('score--0').textContent = '0';
	document.getElementById('score--1').textContent = '0';
	document.getElementById('current--0').textContent = '0';
	document.getElementById('current--1').textContent = '0';

	document.querySelector('.dice').style.display = 'none';
	
	document.getElementById('name--0').textContent = 'Player 1';
	document.getElementById('name--1').textContent = 'Player 2';
	
	document.querySelector('.player--0').classList.remove('player--winner');
	document.querySelector('.player--1').classList.remove('player--winner');
	document.querySelector('.player--0').classList.remove('player--active');
	document.querySelector('.player--1').classList.remove('player--active');
	
	document.querySelector('.player--0').classList.add('player--active');
};