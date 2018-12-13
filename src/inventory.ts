import Table = require("cli-table");
import * as mysql from "promise-mysql";
import { Product } from "./product";

export class Inventory {
    public products: Product[] = [];

    public populateInventory() {
        this.products = [];

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
                    this.products.push(objProduct);
                }

                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        });
    }

    public displayInventory(method: string) {
        return new Promise((resolve) => {
            this.populateInventory().then(() => {
                let table: Table;

                if (method === "customer") {
                    table = new Table({
                        // colWidths: [25, 100, 100, 25],
                        head: ["Item ID", "Product Name", "Department ID", "Price"],
                    });
                } else if (method === "manager") {
                    table = new Table({
                        // colWidths: [25, 100, 100, 25],
                        head: ["Item ID", "Product Name", "Department ID", "Price", "Inventory"],
                    });
                }

                let i: number = 0;
                for (i; i < this.products.length; i++) {

                    if (method === "customer") {
                        table.push(
                            [this.products[i].itemId, this.products[i].productName,
                            this.products[i].deptId, this.products[i].price],
                        );
                    } else if (method === "manager") {
                        table.push(
                            [this.products[i].itemId, this.products[i].productName,
                            this.products[i].deptId, this.products[i].price, this.products[i].stockQty],
                        );
                    }
                }

                resolve(table);
            });
        });
    }
}
