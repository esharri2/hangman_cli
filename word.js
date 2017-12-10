const Letter = require("./letter.js");
const randomWord = require("random-word");

let Word = function() {
  this.value = randomWord();
  this.letters = [];
  this.guesses = 10;
  this.guessed = [];
  this.won = false;
  this.Letter = Letter;
};

Word.prototype.printGame = function() {
  let wordDisplay = "";
  this.letters.forEach(function(letter) {
    if (letter.guessed === false) {
      wordDisplay += "_";
    } else {
      wordDisplay += letter.value;
    }
    wordDisplay += " ";
  });
  console.log(wordDisplay + "\n");
  if (this.guessed.length > 0) {
    let guessedList = "";
    this.guessed.forEach((guess, index) => {
      guessedList += guess;
      if (this.guessed.length - 1 !== index) {
        guessedList += ", ";
      }
    });
    console.log(`Wrong guesses: ${guessedList}\n`);
  }
  console.log(`You have ${this.guesses} guesses remaining.\n`);
};

Word.prototype.checkGuess = function(guess) {
  let wrong = true;
  let won = true;

  this.letters.forEach((letter, index) => {
    if (letter.value === guess.toLowerCase()) {
      this.letters[index].guessed = true;
      wrong = false;
    }
    if (letter.guessed === false) {
      won = false;
    }
  });

  //Decrement guesses if the letter wasn't found
  if (wrong) {
    if (!this.guessed.includes(guess)) {
      this.guesses--;
      this.guessed.push(guess);
    }
  }
  //Declare winner if none of the letters were unguessed
  if (won) {
    this.won = true;
  }
};

module.exports = Word;
