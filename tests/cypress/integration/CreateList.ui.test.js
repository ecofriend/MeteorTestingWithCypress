describe("Enter a list title", () => {
  it("Displays the list title on screen", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-test="listTitle"]').type("My Top 10 Sci-Fi Movies");

    cy.get('[data-test="submitTitle"]').click();

    cy.get('[data-test="listTitle"]').should("have.value", "");

    cy.contains("My Top 10 Sci-Fi Movies");
  });
});
