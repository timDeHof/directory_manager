import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";

async function createFile() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "filePath",
      message: "Enter file path to create:",
    },
  ]);
  const filepath = path.resolve(__dirname, answers.filePath);
  fs.openSync(filepath, "w");
  console.log(chalk.green("An empty file has been created"));
}

export default createFile;
