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
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let command = yield mainMenu();
        switch (command) {
            case "list":
                // Call your function to list directory contents
                const listDirContents = (yield import("./commands/listDirContents.js"))
                    .default;
                yield listDirContents();
                break;
            case "mkdir":
                // Call your function to create a directory
                const createDir = (yield import("./commands/createDir.js")).default;
                yield createDir();
                break;
            case "touch":
                // Call your function to create a file
                const createFile = (yield import("./commands/createFile.js")).default;
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