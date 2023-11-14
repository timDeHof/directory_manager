import fs from "fs";
import path from "path";
import ora from "ora";
import inquirer from "inquirer";
import chalk from "chalk";

async function listDirContents() {
  // Ask the user for the directory path
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "dirPath",
      message: "Enter the directory path to list contents:",
      default: ".", // Default to the current directory
    },
  ]);

  const directoryPath = answers.dirPath;
  const spinner = ora("Listing directory contents").start();
  console.log("\n");
  try {
    const files = await fs.promises.readdir(directoryPath);
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(
        path.resolve(directoryPath, file),
      );
      const { size, birthtime } = fileDetails;
      return { "filename": file, "size(KB)": size, "created_at": birthtime };
    });
    const detailedFiles = await Promise.all(detailedFilesPromises);

    console.table(detailedFiles);
    spinner.succeed("Directory listed");
  } catch (error: any) {
    spinner.fail("Error occurred while reading the directory");
    console.error(chalk.red(error.message));
  }
}

export default listDirContents;
