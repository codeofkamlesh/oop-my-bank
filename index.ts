#! /usr/bin/env node
import inquirer from "inquirer"

//Bank account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number):void
    deposite(amount: number):void
    checkBalance():void
      
}

//Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor (accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    //Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
        console.log(`withdrawal of $${amount} successful. Remainig balance: $${this.balance}`);
        
    } else {
        console.log("insufficient balance.");
        
    }
}

deposite(amount: number): void {
    if(amount > 100){
        amount -= 1; //$1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposite of $${amount} successful. Remaining balance: $${this.balance}`);
    
    
}

//check balance

checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
    
}
}

//customer class
class customer{
    firstName: string;
    lastName:  string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount )
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;

    }

}

// create bank accounts
const accounts: BankAccount[]=[
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000),
];

//create customers
const customers: customer[] = [
    new customer ("Hamza", "khan", "Male", 30, 3163456789, accounts[0]),
    new customer ("kamlesh", "kumar", "Male", 31, 3033456789, accounts[1]),
    new customer ("sana", "khan", "female", 32, 3423456789, accounts[2])
]

//function to interact with bank account

async function service(){
    do{

        const accountNumberInput = await inquirer.prompt([
            {
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        }
    ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposite", "withdraw", "check Balance", "Exit"]
            }
        ]);

        switch(ans.select){
            case "Deposite":
                const depositeAmount = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite"

                    }
                ]);
                customer.account.deposite(depositeAmount.amount);
                break;

                case "withdraw":
                const withdrawAmount = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite"

                    }
                ]);
                customer.account.withdraw(withdrawAmount.amount);
                break;

                case "check Balance":
                    customer.account.checkBalance();
                    break;

                    case "Exit":
                        console.log("Exiting bank program...");
                        console.log("\n Thanks for using our bank services. Have a great day.");
                        return;
                        
                        
        }
            
        }else {
            console.log("Invalid account number. Please try again.");
            
        }

    }while(true)
}

service()