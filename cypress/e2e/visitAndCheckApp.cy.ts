import { path } from './commonData';
import * as selectors from './selectors';

const { appURL, linkedInURL, githubURL } = path;

const {
	booksList,
	appFooter,
	footerTitle,
	githubLink,
	linkedInLink,
	gmailAddress,
	addNewBookButton,
	booksListWrapper,
	appHeaderWrapper,
	emptyListPlaceholder,
	appHeaderTitleHeading,
	closeAddBookDialogButton,
	addBookDialog,
	titleItem,
	titleItemLabel,
	titleItemInput,
	authorItem,
	authorItemLabel,
	authorItemInput,
	pagesItem,
	pagesItemLabel,
	pagesItemInput,
	readItem,
	readItemLabel,
	readItemCheckbox,
	formSubmitButton,
} = selectors;

describe('Visit the app and check the initial view', () => {
	before(() => {
		cy.clearLocalStorage();
	});

	it('visits the app and check URL', () => {
		cy.visit(appURL);
		cy.url().should('eq', appURL);
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
		const currentYear: number = new Date().getFullYear();
		cy.fixture('common.json').as('usersData');

		cy.getByDataTest(appFooter)
			.should('be.visible')
			.should('have.class', 'app-footer')
			.should('have.attr', 'id', 'app-footer');

		cy.getByDataTest(footerTitle).should('be.visible').should('contain.text', `${currentYear} | Created by`);

		cy.getByDataTest(githubLink).should('be.visible').should('have.attr', 'href', githubURL);

		cy.getByDataTest(linkedInLink).should('be.visible').should('have.attr', 'href', linkedInURL);

		cy.getByDataTest(gmailAddress).should('be.visible').should('contain.text', 'aweb.wojciechantos@gmail.com');
	});

	it('checks the "Add new book" dialog structure', () => {
		cy.getByDataTest(addNewBookButton).click();
		cy.getByDataTest(addBookDialog).should('be.visible');

		/* 'Title' item */
		cy.getByDataTest(titleItem).within(() => {
			cy.getByDataTest(titleItemLabel).should('be.visible').should('contain', 'Title');
			cy.getByDataTest(titleItemInput).should('be.visible').should('have.attr', 'required');
		});

		/* 'Author' item */
		cy.getByDataTest(authorItem).within(() => {
			cy.getByDataTest(authorItemLabel).should('be.visible').should('contain', 'Author');
			cy.getByDataTest(authorItemInput).should('be.visible').should('have.attr', 'required');
		});

		/* 'Number of pages' item */
		cy.getByDataTest(pagesItem).within(() => {
			cy.getByDataTest(pagesItemLabel).should('be.visible').should('contain', 'Number of pages');
			cy.getByDataTest(pagesItemInput).should('be.visible').should('have.attr', 'type').and('eq', 'number');
		});

		/* 'Read' item */
		cy.getByDataTest(readItem).within(() => {
			cy.getByDataTest(readItemLabel).should('be.visible').should('contain', 'Read');
			cy.getByDataTest(readItemCheckbox).should('be.visible').should('have.attr', 'type').and('eq', 'checkbox');
		});

		cy.getByDataTest(formSubmitButton).should('be.visible');
		cy.getByDataTest(closeAddBookDialogButton).should('be.visible').click();
		cy.getByDataTest(addBookDialog).should('not.be.visible');
	});
});
