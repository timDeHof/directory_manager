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
import url from "url";
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
export default createDir;
//# sourceMappingURL=createDir.js.map