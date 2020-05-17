import { expect } from "chai";
import { mountCallback } from "cypress-vue-unit-test";
import CreateList from "../../../client/components/CreateList.vue";

describe("Title input", () => {
  before(mountCallback(CreateList));

  describe("clicking the submit button", () => {
    before(() => {
      cy.get("[data-test='listTitle']").type("My Top 10 Sci-Fi Movies");
      cy.get("[data-test='submitTitle']").click();
    });

    it("clears the text field", () => {
      expect(cy.get('[data-test="listTitle"]').should("have.value", ""));
    });

    it("assigns input value to data variable: listTitle", () => {
      expect(Cypress.vue.listTitle).to.be.equal("My Top 10 Sci-Fi Movies");
    });
  });
});
