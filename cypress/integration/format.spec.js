/* eslint-disable no-undef */
/// <reference types="cypress" />

context("Format", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8001");
    });

    it("Formats JSON as expected", () => {
        let jsonToFormat = "{\"Hi\":\"JSON goes here\",\"Step 1\":\"Ctrl + V to paste code (it's selected by default)\",\"Step 2\":\"Alt + Shift + F to format\"}";
        let expectedFormatterJson = `{
  "Hi": "JSON goes here",
  "Step 1": "Ctrl + V to paste code (it's selected by default)",
  "Step 2": "Alt + Shift + F to format"
}`;

        cy.window().then((window) => {
            window.codeEditor.setValue("");
        });

        cy.window().then((window) => {
            window.codeEditor.setValue(jsonToFormat);
        });

        cy.get(".format.button").click();

        cy.window().then((window) => {
            assert.equal(expectedFormatterJson, window.codeEditor.getValue());
        });
    });
});