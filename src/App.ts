import './styles.css';
import { Book, DialogInterface } from 'types.ts';
import { Button } from 'components/common/Button';
import { Dialog } from 'components/common/Dialog';
import { Footer } from 'components/domain/Footer';
import { AddBookForm } from 'components/domain/AddBookForm';
import { LibraryStore } from 'components/domain/LibraryStore';

export class App {
	private libraryStore: LibraryStore;

	constructor(library: Book[]) {
		this.libraryStore = new LibraryStore(library);
	}

	init(): void {
		document.querySelector<HTMLDivElement>('#app-container')!.innerHTML = `
			<main>
				<header class="header-wrapper" data-test="app-header__wrapper">
       				<h1 data-test="app-header__title-heading">My library</h1>
    			</header>
    			<div class="books-list__wrapper" data-test="books-list__wrapper">
					<ul id="books-list" class="books-list" data-test="books-list"></ul>
    				<p class="books-list__empty-list-placeholder" data-test="books-list__empty-list-placeholder">Here your added books will be shown...</p>
    			</div>
  			</main>
		`;

		const addNewBookDialog: DialogInterface = new Dialog('Add new book');
		const addBookForm = new AddBookForm(this.libraryStore, addNewBookDialog);
		addNewBookDialog.dialogContent = addBookForm.render();
		const addNewBookDialogElement: HTMLDialogElement = addNewBookDialog.render();

		const addNewBookButton: HTMLButtonElement = new Button({
			iconName: 'plus',
			text: 'Add new book',
			dataTest: 'add-new-book__button',
			onClick: () => addNewBookDialog.getDialog().showModal(),
		}).render();

		const footerElement: HTMLElement = new Footer().render();

		document.querySelector<HTMLDivElement>('.header-wrapper')!.appendChild(addNewBookButton);
		document.getElementById('app-container')!.appendChild(addNewBookDialogElement);
		document.getElementById('app-container')!.appendChild(footerElement);

		this.libraryStore.loadBooksList();
	}
}
