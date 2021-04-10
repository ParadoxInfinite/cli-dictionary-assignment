const chalk = require("chalk");
function displayOutput(word, type, results) {
  if (results) {
    console.log(
      chalk.grey("---------------------------------------------------------")
    );
    console.log("Given word: " + chalk.bgCyan.whiteBright(" " + word + " "));
    if (type !== "All") {
      console.log(
        chalk.bgCyan.whiteBright(" " + type + " ") +
          " for the given word: " +
          chalk.bgCyan.whiteBright(" " + results + " ")
      );
    } else {
      for (let type in results) {
        console.log(
          chalk.bgCyan.whiteBright(
            " " + type[0].toUpperCase() + type.slice(1) + " "
          ) +
            " for the given word: " +
            chalk.bgCyan.whiteBright(" " + results[type] + " ")
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
    chalk.bgCyan.whiteBright(" " + word + " ") +
      " is not in our database, please try another word."
  );
}
module.exports = { displayOutput, displayNotFound };
