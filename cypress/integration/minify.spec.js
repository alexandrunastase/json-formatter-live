/* eslint-disable no-undef */
/// <reference types="cypress" />

context("Minify", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8001");
    });

    it("Minifies the JSON", () => {

        let json = `{
    "Hi": "JSON goes here",
    "Step 1": "Ctrl + V to paste code (it's selected by default)",
    "Step 2": "Alt + Shift + F to format"
}`;

        let expectedMinifiedJson = "{\"Hi\":\"JSON goes here\",\"Step 1\":\"Ctrl + V to paste code (it's selected by default)\",\"Step 2\":\"Alt + Shift + F to format\"}";

        cy.window().then(window => {
            window.codeEditor.setValue("");
        });

        cy.window().then(window => {
            window.codeEditor.setValue(json);
        });

        cy.get(".minify.button").click();

        cy.window().then(window => {
            assert.equal(expectedMinifiedJson, window.codeEditor.getValue());
        });
    });
});