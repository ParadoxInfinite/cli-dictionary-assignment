const dataset = require("./dataset.json");
const { displayOutput, displayNotFound } = require("./display");
function checkExistence(word) {
  if (dataset[word]) return true;
  else displayNotFound(word);
}
function findDefinition(word) {
  if (checkExistence(word)) {
    displayOutput(word, "Definition", dataset[word].definition);
  }
}
function findSynonyms(word) {
  if (checkExistence(word)) {
    displayOutput(word, "Synonyms", dataset[word].synonyms.join(", "));
  }
}
function findAntonyms(word) {
  if (checkExistence(word)) {
    displayOutput(word, "Antonyms", dataset[word].antonyms.join(", "));
  }
}
function findExample(word) {
  if (checkExistence(word)) {
    displayOutput(word, "Examples", dataset[word].example);
  }
}
function findAll(word) {
  if (checkExistence(word)) {
    displayOutput(word, "All", dataset[word]);
  }
}
function findRandom() {
  randomWord = Object.keys(dataset)[
    Math.floor(Math.random() * Object.keys(dataset).length)
  ];
  displayOutput(randomWord, "All", dataset[randomWord]);
}
module.exports = {
  findDefinition,
  findSynonyms,
  findAntonyms,
  findAll,
  findExample,
  findRandom,
};
