/// <reference types="cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work", () => {
    cy.get(".MuiToolbar-root").contains("Signup").click();
    cy.get("p").should("contain.text", "Welcome! Signup");

    cy.get(".MuiToolbar-root").contains("Login").click();
    cy.get("p").should("contain.text", "Welcome! Login");
  });
});
