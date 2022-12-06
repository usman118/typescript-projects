import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
const randomNum = Math.floor(Math.random() * 100) + 1;
let userGuess;
let numGuesses = 10;
console.log(chalk.blue.bgRed.bold(figlet.textSync("Guess Number", {
    verticalLayout: "full",
})));
const guessGame = async () => {
    while (numGuesses > 0) {
        const { guess } = await inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a number between 1 and 100",
            },
        ]);
        userGuess = parseInt(guess);
        if (isNaN(userGuess)) {
            console.log(chalk.red("Please enter a number"));
            continue;
        }
        if (userGuess < 1 || userGuess > 100) {
            console.log(chalk.red("Please enter a number between 1 and 100"));
            continue;
        }
        if (userGuess === randomNum) {
            console.log(chalk.green("You guessed the number!"));
            break;
        }
        else if (userGuess < randomNum) {
            console.log(chalk.red("Too low"));
            numGuesses--;
        }
        else if (userGuess > randomNum) {
            console.log(chalk.red("Too high"));
            numGuesses--;
        }
    }
    if (numGuesses === 0) {
        console.log(chalk.red("You ran out of guesses!"));
    }
};
guessGame();
