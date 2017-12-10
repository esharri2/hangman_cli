const Word = require("./word.js");
const inquirer = require("inquirer");

let word;

function initializeGame() {
  word = new Word();
  let wordArray = word.value.split("");
  wordArray.forEach(function(letter) {
    word.letters.push(new word.Letter(letter, 0));
  });
}

initializeGame();

function endGame(won) {
  let message;
  if (won) {
    message = "You won!";
  } else {
    message = "You lost!";
  }
  console.log(`Your word is ${word.value}`);
  inquirer
    .prompt({
      type: "confirm",
      name: "continue",
      message: `${message}. Would you like to play again?`
    })
    .then(answer => {
      if (answer.continue) {
        initializeGame();
        playGame();
      } else {
        console.log("Ok. Goodbye.");
      }
    });
}

function playGame() {
  word.printGame();
  inquirer
    .prompt({
      type: "prompt",
      name: "guess",
      message: "Type the letter you want to guess."
    })
    .then(answer => {
      word.checkGuess(answer.guess);
      if (word.guesses === 0) {
        endGame(false);
      } else if (word.won === true) {
        endGame(true);
      } else {
        playGame();
      }
    });
}

playGame();
