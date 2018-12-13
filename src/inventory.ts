import Table = require("cli-table");
import * as mysql from "promise-mysql";
import { Product } from "./product";

export class Inventory {
    public products: Product[] = [];

    public populateInventory(all: boolean) {
        this.products = [];

        let sql: string;

        return new Promise((resolve) => {

            if (all) {
                sql = `SELECT * FROM bamazon_db.products INNER JOIN
                bamazon_db.departments ON bamazon_db.products.department_id=bamazon_db.departments.department_id`;
            } else {
                sql = `SELECT * FROM bamazon_db.products INNER JOIN
                bamazon_db.departments ON bamazon_db.products.department_id=bamazon_db.departments.department_id
                WHERE bamazon_db.products.stock_quantity <= 5`;
            }

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
                        deptId: `${results[i].department_name}(${results[i].department_id})`,
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

    public displayInventory(method: string, all: boolean) {
        return new Promise((resolve) => {
            this.populateInventory(all).then(() => {
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
                    const itemInc = (i + 1);

                    if (method === "customer") {
                        table.push(
                            [itemInc, this.products[i].productName,
                            this.products[i].deptId, this.products[i].price],
                        );
                    } else if (method === "manager") {
                        table.push(
                            [itemInc, this.products[i].productName,
                            this.products[i].deptId, this.products[i].price, this.products[i].stockQty],
                        );
                    }
                }

                resolve(table);
            }).catch((error) => {
                resolve(false);
            });
        });
    }
}
