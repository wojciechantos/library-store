import * as selectors from './selectors';

const {
	addNewBookButton,
	addBookDialog,
	titleItemInput,
	authorItemInput,
	pagesItemInput,
	readItemCheckbox,
	formSubmitButton,
	booksList,
	emptyListPlaceholder,
	booksListItem,
} = selectors;

describe('Adding book', () => {
	before(() => {
		cy.clearLocalStorage();
	});

	it('should successfully add new book', () => {
		cy.visit('http://localhost:5173/');

		cy.getByDataTest(addNewBookButton).click();
		cy.getByDataTest(addBookDialog).should('be.visible');

		cy.getByDataTest(titleItemInput).type('test-title');
		cy.getByDataTest(authorItemInput).type('test-author');
		cy.getByDataTest(pagesItemInput).type('500');
		cy.getByDataTest(readItemCheckbox).click();
		cy.getByDataTest(formSubmitButton).click();

		cy.getByDataTest(addBookDialog).should('not.be.visible');
	});

	it('should check if the book was added to the list successfully', () => {
		cy.getByDataTest(booksList)
			.should('have.length', 1)
			.within(() => {
				cy.getByDataTest(emptyListPlaceholder).should('not.exist');
				cy.getByDataTest(booksListItem).should('be.visible');
			});
	});
});
