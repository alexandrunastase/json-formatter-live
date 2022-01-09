/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Copy', () => {
	it('Copies the JSON', () => {
		cy.get('.CodeMirror').should('be.visible');
		cy.get('.copy.button').click();

		cy.window().then((window) => {
			window.navigator.clipboard.readText().then((clipboadText) => {
				assert.exists('Hint": "JSON goes here', clipboadText);
			});
		});
	});
});
