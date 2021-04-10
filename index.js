#!/usr/bin/env node

// @see https://www.npmjs.com/package/commander
const { program } = require("commander");
const displayOutput = require("./display");

// Initialize commander
program
  .version("0.1-alpha")
  .description("A Dictionary CLI tool built in JS, running on Node!");

program
  .command("def <word>")
  .description("Shows the definition of the given word")
  .action((word) => console.log(`Definition for the word ${word} is:`));

program
  .command("syn <word>")
  .description("Shows the synonyms for the given word")
  .action((word) => displayOutput(word, "synonyms"));

program
  .command("ant <word>")
  .description("Shows the antonyms for the given word")
  .action((word) => console.log(`Antonyms for the word ${word} are:`));

program
  .command("ex <word>")
  .description("Shows the examples for the given word")
  .action((word) => console.log(`Examples for the word ${word} is:`));

program
  .command("play")
  .description("Start the game!")
  .action(() => console.log(`Start the game`));

if (process.argv[2] === undefined) {
  console.log("Word of the day");
  return;
} else if (process.argv.length === 3 && !process.argv[2].includes("-")) {
  console.log("All information about the given word");
  return;
}

program.parse(process.argv);
