#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
class Atm {
  balance;
  constructor(balance = 0) {
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
  withdraw(amount) {
    this.balance -= amount;
  }
  getBalance() {
    return this.balance;
  }
}
let users = [
  {
    name: "John",
    pin: 1234,
    balance: 1000,
  },
  {
    name: "Jane",
    pin: 5678,
    balance: 2000,
  },
  {
    name: "Jack",
    pin: 9012,
    balance: 3000,
  },
  {
    name: "Jill",
    pin: 3456,
    balance: 4000,
  },
];
const input_params = [
  {
    type: "input",
    name: "name",
    message: "Enter your name: ",
    validate(value) {
      if (value.length === 0) {
        return "Please enter your name";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "pin",
    message: "Enter your pin: ",
    validate(value) {
      if (isNaN(value)) {
        return "Please enter a number";
      }
      return true;
    },
  },
];
const main_menu = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
  },
];
const deposit_menu = [
  {
    type: "input",
    name: "amount",
    message: "Enter amount to deposit: ",
    validate(value) {
      if (isNaN(value)) {
        return "Please enter a number";
      }
      return true;
    },
  },
];
const withdraw_option = [
  {
    type: "input",
    name: "amount",
    message: "Enter amount to Withdraw: ",
    validate(value) {
      if (isNaN(value)) {
        return "Please enter a number";
      }
      return true;
    },
  },
];
console.log(
  chalk.red(
    figlet.textSync("Node ATM", {
      verticalLayout: "full",
    })
  )
);
let atm = new Atm();
console.log("Demo Users");
console.log(users);
inquirer.prompt(input_params).then(async (answers) => {
  let user = users.find(
    (user) =>
      user.name === String(answers.name) && user.pin === parseInt(answers.pin)
  );
  if (user) {
    atm = new Atm(user.balance);
    main_program();
  } else {
    console.log(chalk.redBright("Invalid credentials"));
  }
});
async function main_program() {
  do {
    let response = await inquirer.prompt(main_menu);
    console.log(response);
    switch (response.action) {
      case "Deposit":
        {
          console.log("Deposit");
          let amountDeposit = await inquirer.prompt(deposit_menu);
          let { amount } = amountDeposit;
          atm.deposit(parseInt(amount));
          let totalAmount = atm.getBalance();
          console.log(
            chalk.greenBright(`Your New  balance is: ${totalAmount}`)
          );
        }
        break;
      case "Withdraw":
        {
          console.log("Withdraw");
          let amountWithdraw = await inquirer.prompt(withdraw_option);
          let { amount } = amountWithdraw;
          atm.withdraw(parseInt(amount));
          let totalAmount = atm.getBalance();
          console.log(
            chalk.yellowBright(`Your remaining  balance is: ${totalAmount}`)
          );
        }
        break;
      case "Check Balance":
        console.log("Check Balance");
        let totalAmount = atm.getBalance();
        console.log(chalk.bgBlue(`Your balance is: ${totalAmount}`));
        break;
      case "Exit":
        console.log(chalk.bold("Bye Bye <3 "));
        console.log(chalk.bgRedBright("Exit..."));
        process.exit(0);
      default:
        main_program();
    }
  } while (true);
}
