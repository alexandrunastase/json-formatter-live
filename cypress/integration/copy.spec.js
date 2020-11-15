/* eslint-disable no-undef */
/// <reference types="cypress" />

context("Copy", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8001");
    });

    it("Copies the JSON", () => {

        let json = `{
    "Hint": "JSON goes here",
    "Step 1": "Ctrl + V to paste code (it's selected by default)",
    "Step 2": "Alt + Shift + F to format",
    "Keyboard Shortcuts": {
        "Ctrl + A": "Select all text",
        "Ctrl + D": "Delete current line",
        "Ctrl + X": "Cut current line",
        "Alt + F": "Toggle fold (cursor after start bracket)",
        "Alt + Shift + F": "Format",
        "Alt + Shift + M": "Minify"
    }
}
        `;

        cy.window().then(window => {
            window.codeEditor.setValue("");
        });

        cy.window().then(window => {
            window.codeEditor.setValue(json);
        });

        cy.get(".copy.button").click();

        cy.window().then(window => {
            window.navigator.clipboard.readText().then(clipboadText => {
                assert.equal(json, clipboadText);
            });
        });
    });
});