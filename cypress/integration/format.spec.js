/* eslint-disable no-undef */
/// <reference types="cypress" />

// TODO: Add test for shortcut also
context('Format', () => {
	it('Formats JSON as expected', () => {
		let editor;
		cy.get('.CodeMirror').then(($editor) => {
			editor = $editor[0].CodeMirror;

			let jsonToFormat = `{"Hi":"JSON goes here","Step 1":"Ctrl + V to paste code (it\'s selected by default)","Step 2":"Alt + Shift + F to format"}`;
			let expectedFormatterJson = `{
  "Hi": "JSON goes here",
  "Step 1": "Ctrl + V to paste code (it's selected by default)",
  "Step 2": "Alt + Shift + F to format"
}`;

			editor.setValue('');
			editor.setValue(jsonToFormat);

			cy.get('.format.button')
				.click()
				.then(() => {
					assert.equal(expectedFormatterJson, editor.getValue());
				});
		});
	});
});
