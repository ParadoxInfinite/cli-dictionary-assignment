const chalk = require("chalk");
const { findSynonyms } = require("./utils");
function displayOutput(word, type) {
  let results;
  switch (type) {
    case "synonyms":
      results = findSynonyms(word);
  }
  if (results) {
    console.log(
      chalk.grey("---------------------------------------------------------")
    );
    console.log("Given word: " + chalk.bgCyan.white(word));
    console.log(
      chalk.bgGrey.black(type) +
        " for the given word is: " +
        chalk.bgGrey.whiteBright(results)
    );
    console.log(
      chalk.grey("---------------------------------------------------------")
    );
  }
}

module.exports = displayOutput;
