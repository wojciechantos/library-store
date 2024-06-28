import { type Book } from 'types.ts';
import { ListItem } from 'components/ListItem';

export class LibraryStore {
	library: Book[];

	constructor(library: Book[]) {
		this.library = library;
	}

	loadBooksList() {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		while (booksList.lastChild) {
			booksList.lastChild.remove();
		}
		this.library.forEach((book: Book) => this.addListElement(book));
		this.updatePlaceholderVisibility();
	}

	addListElement(book: Book) {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		const listItem = new ListItem(book, () => this.removeListElement(book.id), () => this.updateElement(book.id));
		const listItemElement = listItem.render();
		booksList.appendChild(listItemElement);
	}

	removeListElement(bookId: string): void {
		this.library = this.library.filter(book => book.id !== bookId);
		console.log(this.library);
		this.loadBooksList();
	}

	updateElement(bookId: string) {
		const book = this.library.find(book => book.id === bookId);
		if (book) {
			book.read = !book.read;

			this.loadBooksList();
		}
	}

	updatePlaceholderVisibility() {
		const emptyListPlaceholder: HTMLLIElement = document.querySelector<HTMLLIElement>('.books-list__empty-list-placeholder')!;

		if (this.library.length > 0) {
			if (emptyListPlaceholder && emptyListPlaceholder.style) {
				emptyListPlaceholder.style.display = 'none';
			}
		} else {
			if (emptyListPlaceholder && emptyListPlaceholder.style) {
				emptyListPlaceholder.style.display = 'block';
			}
		}
	};
}
