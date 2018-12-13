import * as mysql from "promise-mysql";

export class Product {
    public itemId: number;
    public productName: string;
    public deptId: number;
    public price: number;
    public stockQty: number;
    public sales: number;

    constructor(product: any) {
        this.productName = product.productName;
        this.deptId = product.deptId;
        this.price = product.price;
        this.stockQty = product.stockQty;
        this.sales = product.sales;
    }

    public add() {
        const sql = "INSERT INTO bamazon_db.products SET ?";

        const value = {
            department_id: this.deptId,
            price: this.price,
            product_name: this.productName,
            product_sales: this.sales,
            stock_quantity: this.stockQty,
        };

        return new Promise((resolve) => {
            mysql.createConnection({
                database: "bamazon_db",
                host: "localhost",
                insecureAuth: true,
                password: "password",
                user: "root",
            }).then((conn) => {
                const result = conn.query(sql, value);
                conn.end();
                return result;
            }).then((results) => {
                this.itemId = results.insertId;
                resolve(results.insertId);
            }).catch(() => {
                resolve(false);
            });
        });
    }

    public remove() {
        const sql = "DELETE FROM bamazon_db.products WHERE item_id = ?";
        const value = this.itemId;

        return new Promise((resolve) => {
            mysql.createConnection({
                database: "bamazon_db",
                host: "localhost",
                insecureAuth: true,
                password: "password",
                user: "root",
            }).then((conn) => {
                const result = conn.query(sql, value);
                conn.end();
            }).then(() => {
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        });
    }

    public purchase(qty: number) {
        const sql = "UPDATE bamazon_db.products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?";

        return new Promise((resolve) => {
            this.getCurrentQty().then((currentQty: number) => {
                if (qty > currentQty) {
                    resolve(false);
                } else {
                    this.stockQty = currentQty - qty;
                    this.sales = (qty * this.price) + this.sales;

                    const value = [this.stockQty, this.sales, this.itemId];

                    mysql.createConnection({
                        database: "bamazon_db",
                        host: "localhost",
                        insecureAuth: true,
                        password: "password",
                        user: "root",
                    }).then((conn) => {
                        const result = conn.query(sql, value);
                        conn.end();
                        return result;
                    }).then((results) => {
                        resolve(true);
                    }).catch(() => {
                        resolve(false);
                    });
                }
            });
        });
    }

    public addInv(qty: number) {
        const sql = "UPDATE bamazon_db.products SET stock_quantity = ? WHERE item_id = ?";

        return new Promise((resolve) => {
            this.stockQty = this.stockQty + qty;

            const value = [this.stockQty, this.itemId];

            mysql.createConnection({
                database: "bamazon_db",
                host: "localhost",
                insecureAuth: true,
                password: "password",
                user: "root",
            }).then((conn) => {
                const result = conn.query(sql, value);
                conn.end();
                return result;
            }).then((results) => {
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        });
    }

    public getCurrentQty() {
        const sql = "SELECT stock_quantity FROM bamazon_db.products WHERE item_id = ?";

        return new Promise((resolve) => {
            const value = [this.itemId];

            mysql.createConnection({
                database: "bamazon_db",
                host: "localhost",
                insecureAuth: true,
                password: "password",
                user: "root",
            }).then((conn) => {
                const result = conn.query(sql, value);
                conn.end();
                return result;
            }).then((results) => {
                resolve(results[0].stock_quantity);
            }).catch(() => {
                resolve(false);
            });
        });
    }
}
