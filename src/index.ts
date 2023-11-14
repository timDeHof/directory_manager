#! /usr/bin/env node
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

console.log(chalk.green(figlet.textSync("Dir Manager")));

async function mainMenu() {
  const choices = [
    { name: "List Directory Contents", value: "list" },
    { name: "Create a Directory", value: "mkdir" },
    { name: "Create a file", value: "touch" },
    { name: "Exit", value: "exit" },
  ];

  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "Choose a command:",
      choices: choices,
    },
  ]);
  return command;
}

async function run() {
  let command = await mainMenu();

  switch (command) {
    case "list":
      // Call your function to list directory contents
      const listDirContents = (await import("./commands/listDirContents.js"))
        .default;
      await listDirContents();
      break;
    case "mkdir":
      // Call your function to create a directory
      const createDir = (await import("./commands/createDir.js")).default;
      await createDir();
      break;
    case "touch":
      // Call your function to create a file
      const createFile = (await import("./commands/createFile.js")).default;
      await createFile();
      break;
    case "exit":
      console.log("Exiting...");
      process.exit(0);
  }

  // Optionally, loop back to the menu after the command execution
  await run();
}

run();
