import { expect } from "chai";
import { Product } from "../src/product";

const productDetails: Object = {
    productName: "test-product",
    deptId: 2,
    price: 4.00,
    stockQty: 100,
    sales: 20.00,
}
const newProduct: Product = new Product(productDetails);

describe("Product Functionality", () => {
    it("Should create a product", done => {
        newProduct.add().then(value => {
            expect(value).to.be.a('number');
            done();
        }).catch((error) => {
            console.log(error);
            done();
        });
    });

    it("Should purchase a product (x2)", done => {
        expect(newProduct.stockQty).to.equal(100);
        expect(newProduct.sales).to.equal(20.00);

        newProduct.purchase(2).then(value => {
            expect(value).to.be.true;
            expect(newProduct.stockQty).to.equal(98);
            expect(newProduct.sales).to.equal(28.00);
            done();
        });
    });

    it("Should add 5 to inventory", done => {
        newProduct.addInv(5).then(value => {
            expect(value).to.be.true;
            expect(newProduct.stockQty).to.equal(103);
            done();
        });
    });   

    it("Should purchase a product (x103)", done => {
        newProduct.purchase(103).then(value => {
            expect(value).to.be.true;
            expect(newProduct.stockQty).to.equal(0);
            expect(newProduct.sales).to.equal(440.00);
            done();
        });
    });

    it("Should fail to purchase a product (x1)", done => {

        newProduct.purchase(1).then(value => {
            expect(value).to.be.false;
            done();
        });
    });

    it("Should delete a product", done => {
        newProduct.remove().then(value => {
            expect(value).to.be.true;
            done();
        }).catch((error) => {
            console.log(error);
            done();
        });
    });
});
