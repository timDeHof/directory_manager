#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import path from "path";
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import url from "url";
console.log(chalk.green(figlet.textSync("Dir Manager")));
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const choices = [
            { name: "List Directory Contents", value: "list" },
            { name: "Create a Directory", value: "mkdir" },
            { name: "Create a file", value: "touch" },
            { name: "Exit", value: "exit" },
        ];
        const { command } = yield inquirer.prompt([
            {
                type: "list",
                name: "command",
                message: "Choose a command:",
                choices: choices,
            },
        ]);
        return command;
    });
}
function listDirContents() {
    return __awaiter(this, void 0, void 0, function* () {
        // Ask the user for the directory path
        const answers = yield inquirer.prompt([
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
            const files = yield fs.promises.readdir(directoryPath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs.promises.lstat(path.resolve(directoryPath, file));
                const { size, birthtime } = fileDetails;
                return { "filename": file, "size(KB)": size, "created_at": birthtime };
            }));
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            console.table(detailedFiles);
            spinner.succeed("Directory listed");
        }
        catch (error) {
            spinner.fail("Error occurred while reading the directory");
            console.error(chalk.red(error.message));
        }
    });
}
function createDir() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
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
        }
        else {
            console.log(chalk.yellow("Directory already exists"));
        }
    });
}
function createFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
            {
                type: "input",
                name: "filePath",
                message: "Enter file path to create:",
            },
        ]);
        const filepath = path.resolve(__dirname, answers.filePath);
        fs.openSync(filepath, "w");
        console.log(chalk.green("An empty file has been created"));
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let command = yield mainMenu();
        switch (command) {
            case "list":
                // Call your function to list directory contents
                yield listDirContents(); // You might want to modify this function to ask for a directory path
                break;
            case "mkdir":
                // Call your function to create a directory
                yield createDir();
                break;
            case "touch":
                // Call your function to create a file
                yield createFile();
                break;
            case "exit":
                console.log("Exiting...");
                process.exit(0);
        }
        // Optionally, loop back to the menu after the command execution
        yield run();
    });
}
run();
//# sourceMappingURL=index.js.map