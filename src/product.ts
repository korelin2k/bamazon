import * as mysql from "mysql";

export class Product {
    public itemId: number;
    public productName: string;
    public deptId: number;
    public price: number;
    public stockQty: number;
    public sales: number;

    constructor(product) {
        this.itemId = 0;
        this.productName = product.productName;
        this.deptId = product.deptId;
        this.price = product.price;
        this.stockQty = product.stockQty;
        this.sales = product.sales;
    }

    public add() {
        const status: boolean = true;

        const connection = mysql.createConnection({
            database: "bamazon_db",
            host: "localhost",
            insecureAuth: true,
            password: "password",
            user: "root",
        });

        const sql = "INSERT INTO bamazon_db.products SET ?";

        const value = {
            department_id: this.deptId,
            price: this.price,
            product_name: this.productName,
            product_sales: this.sales,
            stock_quantity: this.stockQty,
        };

        connection.connect();
        connection.query(sql, value, (error, results) => {
            if (error) {
                throw error;
            }

            this.itemId = results.insertId;
        });

        connection.end();
        return status;
    }

    public remove() {
        console.log("hi");
    }

    public purchase() {
        console.log("hi");
    }
}
