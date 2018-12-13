import { expect } from "chai";
import { Inventory } from "../src/inventory";

const newInventory: Inventory = new Inventory();

describe("Inventory Functionality", () => {
    it("Should populate the inventory", done => {
        newInventory.populateInventory(true).then(value => {
            expect(value).to.be.true;
            done();
        });
    });

    it("Should display a table for customer", done => {
        newInventory.displayInventory("customer", true).then(value => {
            expect(value.toString()).to.not.have.string('Inventory');
            done()
        });
    });

    it("Should display a table for manager", done => {
        newInventory.displayInventory("manager", true).then(value => {
            expect(value.toString()).to.have.string('Inventory');
            done()
        });
    });
});
