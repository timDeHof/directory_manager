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
import inquirer from "inquirer";
import chalk from "chalk";
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
export default createFile;
//# sourceMappingURL=createFile.js.map