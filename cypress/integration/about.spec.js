/* eslint-disable no-undef */
/// <reference types="cypress" />

context('About', () => {
	it('Scrolls to about section', () => {
		cy.get('.about').should('be.visible').click();

		cy.get('#about').should('be.visible').and('contain', 'About');
		cy.scrollTo('bottom').window().its('scrollY').should('not.equal', 0);
	});
});
