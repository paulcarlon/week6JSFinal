//Declare variables and assign card suits, and values
const suits = ['♠', '♥', '♦', '♣'];
const values = [
  { face: 'A', score: 14 },
  { face: '2', score: 2 },
  { face: '3', score: 3 },
  { face: '4', score: 4 },
  { face: '5', score: 5 },
  { face: '6', score: 6 },
  { face: '7', score: 7 },
  { face: '8', score: 8 },
  { face: '9', score: 9 },
  { face: '10', score: 10 },
  { face: 'J', score: 11 },
  { face: 'Q', score: 12 },
  { face: 'K', score: 13 },
];

//Create Deck and Card classes
class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  /*
    Use a for statement to shuffle the cards in our shuffle() method
    Set iteration as total number of cards(minus 1 because of indexing)
    While i is greater than 0, decrement i.
    Declare a constant variable called newIndex and set it equal to Math.random() * the iteration plus one. Wrap that in a Math.floor statement to ensure we return an integer. 
  */

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1)); //get random index before the current card to swap with
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
      //Looping through all of our cards and swapping them with another card to get a random shuffle
    }
  }
}

class Card {
  constructor(suit, face, score) {
    this.suit = suit;
    this.face = face;
    this.score = score;
  }
}

const freshDeck = () => {
  return suits.flatMap((suit) => {
    // flatMap combines all arrays into one
    return values.map((value) => {
      return new Card(suit, value.face, value.score);
    });
  });
};

let playerDeck, computerDeck, inRound;
class Player {
  constructor(name, hand) {
    this.name = name;
    this.score = 0;
    this.hand = hand;
    this.currentCard;
  }

  playCard() {
    this.currentCard = this.hand.cards.pop();
  }
}

const deck = new Deck();
deck.shuffle();

const deckMidpoint = Math.ceil(deck.cards.length / 2);
playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.cards.length));
let bobPlayer = new Player('bob', playerDeck);

let barryPlayer = new Player('barry', computerDeck);
let p1score = document.querySelector('.player1Score');
let p2score = document.querySelector('.player2Score');
let score = document.querySelector('.score');
let winnerDiv = document.querySelector('.winner');
const playARound = (playerOne, playerTwo) => {
  playerOne.playCard();
  playerTwo.playCard();
  p1score.innerHTML = `Player 1 Card: ${playerOne.currentCard.face} of ${playerOne.currentCard.suit}
  `;

  p2score.innerHTML = `Player 2 Card: ${playerTwo.currentCard.face} of ${playerTwo.currentCard.suit}`;

  let winner = '';
  if (playerOne.currentCard.score > playerTwo.currentCard.score) {
    winner = `${playerOne.name} wins round`;
    playerOne.score++;
  } else if (playerOne.currentCard.score < playerTwo.currentCard.score) {
    winner = `${playerTwo.name} wins round`;
    playerTwo.score++;
  } else {
    winner = "It' a tie!";
  }

  score.innerHTML = `Player 1 Score: ${playerOne.score}<br>
  Player 2 Score: ${playerTwo.score}`;
};

let roundNumber = document.querySelector('.round');
let button = document.getElementById('button');
let round = 1;
button.addEventListener('click', () => {
  roundNumber.innerHTML = `Round # ${round}`;
  if (round <= 26) {
    roundNumber.innerHTML = `Round # ${round}`;
    winnerDiv.innerHTML = '';
    button.innerText = 'Play';
    playARound(bobPlayer, barryPlayer);
    round++;
  } else {
    roundNumber.innerHTML = `GAME OVER`;
    button.innerText = 'THE END';
    button.disabled = true;
    winnerDiv.innerHTML =
      bobPlayer.score > barryPlayer.score
        ? `EXCELLENT, PLAYER 1!`
        : `FLAWLESS VICTORY PLAYER 2`;
  }
});
