import * as mysql from "promise-mysql";
import { Product } from "./product";
import { displayTable, populateProducts } from "./products";

let products: Product[] = [];

populateProducts().then((value: Product[]) => {
    products = value;

    products[1].addInv(2).then(() => {
        console.log("Values added!");

        displayTable("customer").then((value2: string) => {
            console.log(value2.toString());
        });

        displayTable("manager").then((value3: string) => {
            console.log(value3.toString());
        });
    });
});
