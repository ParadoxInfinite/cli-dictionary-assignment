#!/usr/bin/env node

// @see https://www.npmjs.com/package/commander
const { program } = require("commander");
const {
  findSynonyms,
  findAntonyms,
  findAll,
  findExample,
  findDefinition,
  findRandom,
} = require("./utils");
const game = require("./game");

// Initialize commander
program
  .version("0.1-alpha")
  .description("A Dictionary CLI tool built in JS, running on Node!");

program
  .command("def <word>")
  .description("Shows the definition of the given word")
  .action((word) => findDefinition(word.toLowerCase()));

program
  .command("syn <word>")
  .description("Shows the synonyms for the given word")
  .action((word) => findSynonyms(word.toLowerCase()));

program
  .command("ant <word>")
  .description("Shows the antonyms for the given word")
  .action((word) => findAntonyms(word.toLowerCase()));

program
  .command("ex <word>")
  .description("Shows an example for the given word")
  .action((word) => findExample(word.toLowerCase()));

program
  .command("play")
  .description("Start the game!")
  .action(() => game());

if (process.argv[2] === undefined) {
  findRandom();
  return;
} else if (
  process.argv.length === 3 &&
  !process.argv[2].includes("-") &&
  process.argv[2].toLowerCase() !== "play"
) {
  findAll(process.argv[2].toLowerCase());
  return;
}

program.parse(process.argv);
