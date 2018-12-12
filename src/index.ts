
import Table = require("cli-table");
import * as mysql from "promise-mysql";
import { Product } from "./product";

const products: Product[] = [];

function populateProducts(method: string) {
    return new Promise((resolve) => {
        const sql = "SELECT * FROM bamazon_db.products";

        mysql.createConnection({
            database: "bamazon_db",
            host: "localhost",
            insecureAuth: true,
            password: "password",
            user: "root",
        }).then((conn) => {
            const result = conn.query(sql);
            conn.end();
            return result;
        }).then((results) => {
            let table: Table;

            if (method === "customer") {
                table = new Table({
                    // colWidths: [25, 100, 100, 25],
                    head: ["Item ID", "Product Name", "Department ID", "Price"],
                });

                let i: number = 0;
                for (i; i < results.length; i++) {
                    const product = {
                        deptId: results[i].department_id,
                        price: results[i].price,
                        productName: results[i].product_name,
                        sales: results[i].product_sales,
                        stockQty: results[i].stock_quantity,
                    };

                    const objProduct: Product = new Product(product);
                    objProduct.itemId = results[i].item_id;
                    products.push(objProduct);

                    table.push(
                        [results[i].item_id, results[i].product_name, results[i].department_id, results[i].price],
                    );
                }
            } else if (method === "manager") {
                table = new Table({
                    // colWidths: [25, 100, 100, 25],
                    head: ["Item ID", "Product Name", "Department ID", "Price", "Inventory"],
                });

                let i: number = 0;
                for (i; i < results.length; i++) {
                    const product = {
                        deptId: results[i].department_id,
                        price: results[i].price,
                        productName: results[i].product_name,
                        sales: results[i].product_sales,
                        stockQty: results[i].stock_quantity,
                    };

                    const objProduct: Product = new Product(product);
                    objProduct.itemId = results[i].item_id;
                    products.push(objProduct);

                    table.push(
                        [results[i].item_id, results[i].product_name,
                        results[i].department_id, results[i].price, results[i].stock_quantity],
                    );
                }
            }

            resolve(table);
        }).catch(() => {
            resolve(false);
        });
    });
}

populateProducts("customer").then((value) => {
    console.log(value.toString());
});

populateProducts("manager").then((value) => {
    console.log(value.toString());

    products[1].addInv(2).then(() => {
        console.log("Values added!");

        populateProducts("manager").then((value2) => {
            console.log(value2.toString());
        });
    });
});
