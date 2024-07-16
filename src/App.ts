import './styles.css';
import { Book, DialogInterface } from 'types.ts';
import { Button } from 'components/common/Button';
import { Dialog } from 'components/common/Dialog';
import { Footer } from 'components/domain/Footer';
import { AddBookForm } from 'components/domain/AddBookForm';
import { Heading, Text } from 'components/common/Typography';
import { LibraryStore } from 'components/domain/LibraryStore';

export class App {
	private libraryStore: LibraryStore;

	constructor(library: Book[]) {
		this.libraryStore = new LibraryStore(library);
	}

	init(): void {
		document.querySelector<HTMLDivElement>('#app-container')!.innerHTML = `
			<main>
				<header class="header-wrapper" data-test="app-header__wrapper"></header>
    			<div class="books-list__wrapper" data-test="books-list__wrapper">
					<ul id="books-list" class="books-list" data-test="books-list"></ul>
    			</div>
  			</main>
		`;

		const appHeading: HTMLHeadingElement = new Heading({
			level: 1,
			text: 'My library',
			fontWeight: 'bold',
			dataTest: 'app-header__title-heading',
		}).render();

		const emptyListPlaceholder: HTMLParagraphElement = new Text({
			text: 'Here your added books will be shown...',
			dataTest: 'books-list__empty-list-placeholder',
			className: 'books-list__empty-list-placeholder',
		}).render();

		const addNewBookDialog: DialogInterface = new Dialog({ title: 'Add new book', dataTest: 'add-book' });

		addNewBookDialog.dialogContent = new AddBookForm({
			dataTest: 'add-book',
			storeInstance: this.libraryStore,
			dialogInstance: addNewBookDialog,
		}).render();

		const addNewBookDialogElement: HTMLDialogElement = addNewBookDialog.render();

		const addNewBookButton: HTMLButtonElement = new Button({
			iconName: 'plus',
			text: 'Add new book',
			dataTest: 'add-book__button',
			onClick: () => addNewBookDialog.getDialog().showModal(),
		}).render();

		const footerElement: HTMLElement = new Footer().render();

		document.querySelector<HTMLDivElement>('.header-wrapper')!.appendChild(appHeading);
		document.querySelector<HTMLDivElement>('.header-wrapper')!.appendChild(addNewBookButton);
		document.querySelector<HTMLDivElement>('.books-list__wrapper')!.appendChild(emptyListPlaceholder);
		document.getElementById('app-container')!.appendChild(addNewBookDialogElement);
		document.getElementById('app-container')!.appendChild(footerElement);

		this.libraryStore.loadBooksList();
	}
}
