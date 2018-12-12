import * as mysql from "promise-mysql";

export class Product {
    public itemId: number;
    public productName: string;
    public deptId: number;
    public price: number;
    public stockQty: number;
    public sales: number;

    constructor(product: any) {
        this.itemId = 0;
        this.productName = product.productName;
        this.deptId = product.deptId;
        this.price = product.price;
        this.stockQty = product.stockQty;
        this.sales = product.sales;
    }

    public add() {
        // const status: boolean = true;

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
        console.log("hi");
    }

    public purchase() {
        console.log("hi");
    }
}
