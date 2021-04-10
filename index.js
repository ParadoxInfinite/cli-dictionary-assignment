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
  .action((word) => findDefinition(word));

program
  .command("syn <word>")
  .description("Shows the synonyms for the given word")
  .action((word) => findSynonyms(word));

program
  .command("ant <word>")
  .description("Shows the antonyms for the given word")
  .action((word) => findAntonyms(word));

program
  .command("ex <word>")
  .description("Shows an example for the given word")
  .action((word) => findExample(word));

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
  process.argv[2] !== "play"
) {
  findAll(process.argv[2]);
  return;
}

program.parse(process.argv);
