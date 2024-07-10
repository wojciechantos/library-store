import * as selectors from './selectors';

const {
	booksList,
	footerTitle,
	addNewBookButton,
	booksListWrapper,
	appHeaderWrapper,
	emptyListPlaceholder,
	appHeaderTitleHeading,
} = selectors;

describe('Visit the app and check the initial view', () => {
	it('visits the app and check URL', () => {
		cy.visit('http://localhost:5173/');
		cy.url().should('eq', 'http://localhost:5173/');
		cy.get('#app-container').should('be.visible');
	});

	it('checks the main app view structure', () => {
		cy.get('main').should('be.visible');

		cy.getByDataTest(appHeaderWrapper)
			.should('be.visible')
			.should('have.class', 'header-wrapper')
			.within(() => {
				cy.getByDataTest(appHeaderTitleHeading).should('be.visible').should('contain.text', 'My library');
				cy.getByDataTest(addNewBookButton)
					.should('be.visible')
					.should('not.be.disabled')
					.should('contain.text', 'Add new book');
			});

		cy.getByDataTest(booksListWrapper)
			.should('be.visible')
			.should('have.length', 1)
			.should('have.class', 'books-list__wrapper')
			.within(() => {
				cy.getByDataTest(booksList).should('not.be.visible');
				cy.getByDataTest(emptyListPlaceholder)
					.should('be.visible')
					.should('have.class', 'books-list__empty-list-placeholder')
					.should('contain.text', 'Here your added books will be shown...');
			});
	});

	it('checks the app footer', () => {
		cy.get('footer').should('be.visible');
		cy.getByDataTest(footerTitle).should('be.visible').should('contain.text', 'Like my work?');
	});
});
