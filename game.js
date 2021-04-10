const { selectRandomWord, findAll } = require("./utils");
const dataset = require("./dataset.json");
const inquirer = require("inquirer");
const { displayGameHint, displayWrongAttempt } = require("./display");
let questions = [
  {
    type: "input",
    name: "guessWord",
    message: "Guess the word!",
    validate: function (value) {
      var passvalue = value.match(/^[A-Za-z]+$/);
      if (passvalue) return true;
      return "Please enter alphabets only.";
    },
  },
  {
    type: "list",
    name: "nextOption",
    message: "What would you do now?",
    choices: ["Try Again", "Hint", "Quit"],
  },
];
function wordGuessPrompt() {
  return new Promise((resolve, reject) => {
    inquirer.prompt(questions[0]).then((answer) => {
      resolve(answer);
    });
  });
}

function wrongGuessPrompt() {
  return new Promise((resolve, reject) => {
    inquirer.prompt(questions[1]).then((answer) => {
      resolve(answer);
    });
  });
}

function checkAnswer(guess, answer, remainingSynonyms) {
  if (guess === answer || remainingSynonyms.includes(guess)) {
    console.log("You got the correct word!");
    return true;
  }
  return false;
}

async function game() {
  let answer = selectRandomWord;
  let remainingHints = dataset[answer];
  let initialRandomHintType = Object.keys(dataset[answer])[
    Math.floor(Math.random() * (Object.keys(dataset[answer]).length - 1))
  ];
  let initialRandomHint =
    dataset[answer][initialRandomHintType][
      Math.floor(Math.random() * dataset[answer][initialRandomHintType].length)
    ];
  remainingHints[initialRandomHintType] = remainingHints[
    initialRandomHintType
  ].filter((word) => word !== initialRandomHint);
  displayGameHint(initialRandomHint, initialRandomHintType);
  let guess = await wordGuessPrompt();
  if (!checkAnswer(guess.guessWord, answer, remainingHints.synonyms)) {
    displayWrongAttempt();
    let choice = await wrongGuessPrompt();
    while (choice.nextOption !== "Quit") {
      if (choice.nextOption === "Try Again") {
        guess = await wordGuessPrompt();
        if (!checkAnswer(guess.guessWord, answer, remainingHints.synonyms)) {
          displayWrongAttempt();
          choice = await wrongGuessPrompt();
        } else {
          break;
        }
      } else if (choice.nextOption === "Hint") {
        let hintType = Object.keys(dataset[answer])[
          Math.floor(Math.random() * (Object.keys(dataset[answer]).length - 1))
        ];
        let hint =
          dataset[answer][hintType][
            Math.floor(Math.random() * dataset[answer][hintType].length)
          ];
        remainingHints[hintType] = remainingHints[hintType].filter(
          (word) => word !== hint
        );
        displayGameHint(hint, hintType);
        guess = await wordGuessPrompt();
        if (!checkAnswer(guess.guessWord, answer, remainingHints.synonyms)) {
          displayWrongAttempt();
          choice = await wrongGuessPrompt();
        } else {
          break;
        }
      }
    }
    findAll(answer);
  }
}

module.exports = game;
