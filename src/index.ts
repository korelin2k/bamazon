import { Inventory } from "./inventory";

const inventory = new Inventory();

inventory.populateInventory().then(() => {
    inventory.products[1].addInv(2).then(() => {
        console.log("Values added!");

        inventory.displayInventory("customer").then((value2: string) => {
            console.log(value2.toString());

            inventory.displayInventory("manager").then((value3: string) => {
                console.log(value3.toString());
            });
        });
    });
});
