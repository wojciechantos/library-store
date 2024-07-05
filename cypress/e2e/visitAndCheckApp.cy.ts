describe('Visit and check app', () => {
	it('visits the app and check URL', () => {
		cy.visit('http://localhost:5173/');
		cy.url().should('eq', 'http://localhost:5173/');
	});

	it('check the initial app view and components', () => {
		cy.get('#app-container').should('be.visible');
		cy.get('header')
			.should('be.visible')
			.should('have.class', 'header-wrapper')
			.within(() => {
				cy.get('h1').should('be.visible').should('contain.text', 'My library');
				cy.get('button')
					.should('be.visible')
					.should('not.be.disabled')
					.should('have.class', 'button button--md button--primary')
					.should('contain.text', 'Add new book');
			});
	});

	it('check the dialog components', () => {
		cy.get('#app-container').should('be.visible');
	});
});
