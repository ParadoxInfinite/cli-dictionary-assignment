const chalk = require("chalk");
function displayOutput(word, type, results) {
  if (results) {
    console.log(
      chalk.grey("---------------------------------------------------------")
    );
    console.log("Given word: " + outputFormat(word));
    if (type !== "All") {
      console.log(
        outputFormat(type) + " for the given word: " + outputFormat(results)
      );
    } else {
      for (let type in results) {
        console.log(
          outputFormat(type[0].toUpperCase() + type.slice(1)) +
            " for the given word: " +
            outputFormat(results[type])
        );
      }
    }
    console.log(
      chalk.grey("---------------------------------------------------------")
    );
  }
}
function displayNotFound(word) {
  console.log(
    outputFormat(word) + " is not in our database, please try another word."
  );
}

function outputFormat(wordToFormat) {
  return chalk.bgCyan.whiteBright(" " + wordToFormat + " ");
}

function displayGameHint(hint, type) {
  console.log("Hint: " + outputFormat(hint) + " | Type: " + outputFormat(type));
}
module.exports = { displayOutput, displayNotFound, displayGameHint };
