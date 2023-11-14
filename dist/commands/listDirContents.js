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
import ora from "ora";
import inquirer from "inquirer";
import chalk from "chalk";
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
export default listDirContents;
//# sourceMappingURL=listDirContents.js.map