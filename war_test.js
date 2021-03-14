var expect = chai.expect;

describe('MyFunctions', function () {
  const deck = new Deck();
  describe('#shuffle', function () {
    it('should return a random number', function () {
      let deck = new Deck();
      let firstCard = deck.cards[0];
      var shuffledDeck = deck.shuffle();
      let newFirstCard = deck.cards[0];
      expect(firstCard).to.not.equal(newFirstCard);
    });
  });

  describe('#freshDeck', function () {
    it('deck should be equal to 52 cards', function () {
      var deck = freshDeck();
      expect(deck.length).to.equal(52);
    });
  });

  describe('#playCard', function () {
    it('should play card from players hand', function () {
      const newDeck = new Deck();
      newDeck.shuffle();
      const deckMidpoint = Math.ceil(newDeck.cards.length / 2);
      onePersonsDeck = new Deck(deck.cards.slice(0, deckMidpoint));

      let newPlayer = new Player('bob', onePersonsDeck);
      const x = newPlayer.playCard();
      expect(bobPlayer.currentCard).to.equal(x);
    });
  });

  describe('#playARound', function () {
    it('should play a card from each deck and print the winner', function () {
      const newDeck = new Deck();
      newDeck.shuffle();
      const deckMidpoint = Math.ceil(newDeck.cards.length / 2);
      onePersonsDeck = new Deck(deck.cards.slice(0, deckMidpoint));
      othersDeck = new Deck(deck.cards.slice(deckMidpoint, deck.cards.length));
      let newPlayer = new Player('bob', onePersonsDeck);
      let newNewPlayer = new Player('bill', othersDeck);
      playARound(newPlayer, newNewPlayer);
      expect(newPlayer.hand.cards.length).to.not.equal(26);
    });
  });
});
