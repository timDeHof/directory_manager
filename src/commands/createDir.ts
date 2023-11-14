import fs from "fs";
import path from "path";
import ora from "ora";
import inquirer from "inquirer";
import chalk from "chalk";
import url from "url";

async function createDir() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "dirPath",
      message: "Enter directory path to create:",
    },
  ]);
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const filepath = path.resolve(__dirname, answers.dirPath);
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log(chalk.green("The directory has been created successfully"));
  } else {
    console.log(chalk.yellow("Directory already exists"));
  }
}

export default createDir;
