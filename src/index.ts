import * as inquirer from "inquirer";
import { Inventory } from "./inventory";
import { Product } from "./product";

// Creating the inventory from the class object
const inventory = new Inventory();

function customer() {
    inventory.displayInventory("customer", true).then((value) => {
        console.log("\n\n\n" + value.toString() + "\n\n\n\n\n\n");

        const questionType: inquirer.Questions = [
            {
                message: "What item do you want to purchase?",
                name: "id",
                type: "input",
            },
            {
                message: "How many units do you want to purchase?",
                name: "qty",
                type: "input",
            },
        ];

        inquirer.prompt(questionType).then((res: inquirer.Answers) => {
            const id = (res.id - 1);
            const qty = res.qty;

            inventory.products[id].purchase(qty).then((status) => {
                if (status) {
                    console.log(`You just purchased: ${inventory.products[id].productName} x${qty}`);
                } else {
                    console.log(`Insufficient Inventory!`);
                }

                customer();
            });
        });
    });
}

function manager() {
    const questionType: inquirer.Questions = [
        {
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
            ],
            message: "How do you want to be a productive member of society today?",
            name: "mgrChoice",
            type: "list",
        },
        {
            message: "What's the product name?",
            name: "prodName",
            type: "input",
            when(res: inquirer.Answers) {
                return (res.mgrChoice === "Add New Product");
            },
        },
        {
            message: "What's the Dept ID?",
            name: "prodDept",
            type: "input",
            when(res: inquirer.Answers) {
                return (res.mgrChoice === "Add New Product");
            },
        },
        {
            message: "What's the price?",
            name: "prodPrice",
            type: "input",
            when(res: inquirer.Answers) {
                return (res.mgrChoice === "Add New Product");
            },
        },
        {
            message: "What's the quantity?",
            name: "prodQty",
            type: "input",
            when(res: inquirer.Answers) {
                return (res.mgrChoice === "Add New Product");
            },
        },
    ];

    inquirer.prompt(questionType).then((res: inquirer.Answers) => {
        if (res.mgrChoice === "View Products for Sale") {
            inventory.displayInventory("manager", true).then((value) => {
                console.log("\n\n\n" + value.toString() + "\n\n\n\n\n\n");
                manager();
            });
        } else if (res.mgrChoice === "View Low Inventory") {

            inventory.displayInventory("manager", false).then((value) => {
                console.log("\n\n\n" + value.toString() + "\n\n\n\n\n\n");

                // Reset inventory with everything
                inventory.populateInventory(true);
                manager();
            });

        } else if (res.mgrChoice === "Add to Inventory") {
            inventory.displayInventory("manager", true).then((value) => {
                console.log("\n\n\n" + value.toString() + "\n\n\n");

                const addQuestions: inquirer.Questions = [
                    {
                        message: "What item ID do you want to add inventory to?",
                        name: "id",
                        type: "input",
                    },
                    {
                        message: "How many units do you want to add?",
                        name: "qty",
                        type: "input",
                    },
                ];

                inquirer.prompt(addQuestions).then((resAdd: inquirer.Answers) => {
                    const id = (resAdd.id - 1);
                    const qty = resAdd.qty;

                    console.log(id, qty);

                    inventory.products[id].addInv(qty).then(() => {
                        console.log("\n\n\n" + "More inventory added!" + "\n\n\n");

                        inventory.populateInventory(true);

                        manager();
                    });
                });
            });
        } else if (res.mgrChoice === "Add New Product") {
            const newProduct = {
                deptId: res.prodDept,
                price: res.prodPrice,
                productName: res.prodName,
                sales: 0,
                stockQty: res.prodQty,
            };

            const createProduct: Product = new Product(newProduct);
            createProduct.add().then(() => {
                console.log("\n\n\n" + "Product Added!" + "\n\n\n");

                manager();
            });
        }
    });
}

function supervisor() {
    console.log("Coming Soon!");
}

function kickoff() {
    const questionType: inquirer.Questions = [
        {
            choices: [
                "Customer",
                "Manager",
                "Supervisor",
                "Exit",
            ],
            message: "Which role do you want to mimic today?",
            name: "role",
            type: "list",
        },
    ];

    inquirer.prompt(questionType).then((res: inquirer.Answers) => {
        const role = res.role;

        if (role === "Customer") {
            customer();
        } else if (role === "Manager") {
            manager();
        } else if (role === "Supervisor") {
            supervisor();
        } else if (role === "exit") {
            process.exit();
        } else {
            console.log("How?");
        }
    });
}

kickoff();
