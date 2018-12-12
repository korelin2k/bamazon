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
    it("Should create a product", () => {
        newProduct.add().then(value => {
            expect(value).to.be.a('number');
        });;
    });

    // it("Validate Product ID", () => {
    //     expect(newProduct.itemId).to.equal(1);
    // });
});
