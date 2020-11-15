/* eslint-disable no-undef */
/// <reference types="cypress" />

context("About", () => {

    beforeEach(() => {
        cy.visit("http://localhost:8001");
    });

    it("Opens About modal", () => {

        cy.get(".about")
            .should("be.visible")
            .click();

        cy.get(".about-modal")
            .should("be.visible")
            .and("contain", "About");
    });
});