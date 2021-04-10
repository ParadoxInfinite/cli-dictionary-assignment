const { selectRandomWord } = require("./utils");
const dataset = require("./dataset.json");
const inquirer = require("inquirer");
const { displayGameHint } = require("./display");
let questions = [
  //question prompt for guessing the word
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
  //question prompt for choosing what to do after incorrect answer
  {
    type: "list",
    name: "nextOption",
    message: "what would you do now?",
    choices: ["Try Again", "Hint", "Quit"],
  },
  //question prompt for choosing between hints
  {
    type: "list",
    name: "typeOfHint",
    message: "which type of hint to you want",
    choices: [
      "Display the word randomly jumbled",
      "Display another definition",
      "Display another antonym",
      "Display another synonym",
    ],
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

function hintPrompt() {
  return new Promise((resolve, reject) => {
    inquirer.prompt(questions[2]).then((answer) => {
      resolve(answer);
    });
  });
}
function checkAnswer(guess, answer, remainingSynonyms) {
  if (guess === answer || remainingSynonyms.includes(guess)) {
    console.log("You got the correct word!");
  }
  return false;
}

async function game() {
  hintsGiven = {};
  answer = selectRandomWord;
  let remainingSynonyms = dataset[answer.synonyms];
  initialRandomHintType = Object.keys(dataset[answer])[
    Math.floor(Math.random() * (Object.keys(dataset[answer]).length - 1))
  ];
  initialRandomHint =
    dataset[answer][initialRandomHintType][
      Math.floor(Math.random() * dataset[answer][initialRandomHintType].length)
    ];
  hintsGiven[initialRandomHintType] = initialRandomHint;
  if (initialRandomHintType === "synonms") {
    remainingSynonyms = remainingSynonyms.filter(
      (word) => word !== initialRandomHint
    );
  }
  displayGameHint(initialRandomHint, initialRandomHintType);
  let guess = await wordGuessPrompt();
  console.log(`Your guess : ${guess.guessWord}`);
  checkAnswer(guess.guessWord, answer, remainingSynonyms);
}

module.exports = game;
