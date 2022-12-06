import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
const input_params = [
  {
    type: "list",
    name: "operator",
    message: "Please Select Operation ",
    choices: [
      "+ Addition",
      "- Subtract",
      "* Multiplication",
      "/ Division",
      "%% Module",
      "% Percentage",
      "^ Power",
      "0 Exit",
    ],
    // waitUserInput: true,
  },
  {
    type: "input",
    name: "value1",
    message: "First Value : ",
    validate(value) {
      if (isNaN(value)) {
        return "Please Enter Number";
      }
      return true;
    },
    // waitUserInput: true,
  },
  {
    type: "input",
    name: "value2",
    message: "Second Value : ",
    validate(value) {
      if (isNaN(value)) {
        return "Please Enter Number";
      }
      return true;
    },
    // waitUserInput: true,
  },
];
// console.log(gradient("orange", "yellow")("Welcome to the CLI Calculator"));
console.log(
  chalk.yellow(
    figlet.textSync("CLI Calculator", {
      verticalLayout: "full",
    })
  )
);
function mainprogram() {
  inquirer.prompt(input_params).then((answers) => {
    //   console.log(answers);
    let operator = answers.operator;
    console.log(operator);
    let value1 = parseInt(answers.value1);
    let value2 = parseInt(answers.value2);
    let result = 0;
    switch (operator.split(" ")[0]) {
      case "+":
        result = value1 + value2;
        operator = "+";
        break;
      case "-":
        result = value1 - value2;
        operator = "-";
        break;
      case "*":
        result = value1 * value2;
        operator = "*";
        break;
      case "/":
        result = value1 / value2;
        operator = "/";
        break;
      case "%%":
        result = value1 % value2;
        operator = "%%";
        break;
      case "%":
        result = (value1 / value2) * 100;
        operator = "%";
        break;
      case "^":
        result = Math.pow(value1, value2);
        operator = "^";
        break;
      case "0":
        console.log(chalk.green("Thank you for using CLI Calculator"));
        process.exit(0);
      default:
        console.log("Invalid Operator");
        mainprogram();
    }
    console.log(
      "\n\n",
      chalk.white(value1 + " "),
      chalk.red(operator),
      chalk.white(" " + value2),
      chalk.white(" = "),
      chalk.red.bold(result),
      "\n\n"
    );
    mainprogram();
  });
}
mainprogram();
