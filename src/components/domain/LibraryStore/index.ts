import './styles.css';
import { ListItem } from 'components/domain/ListItem';
import { type Book, LibraryStoreInterface } from 'types.ts';

export class LibraryStore implements LibraryStoreInterface {
	private library: Book[];

	constructor(library: Book[]) {
		this.library = library;
	}

	public loadBooksList(): void {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		while (booksList.lastChild) {
			booksList.lastChild.remove();
		}
		this.library.forEach((book: Book) => this.addListElement(book));
		this.updatePlaceholderVisibility();
	}

	public addListElement(book: Book): void {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		const listItem = new ListItem(book, () => this.removeListElement(book.id), () => this.updateListElement(book.id));
		const listItemElement = listItem.render();
		booksList.appendChild(listItemElement);
		this.library.push(book);
	}

	public removeListElement(bookId: string): void {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		const listItemElement = booksList.querySelector(`[data-id="${bookId}"]`);

		if (listItemElement) {
			booksList.removeChild(listItemElement);
		}

		this.library = this.library.filter(book => book.id !== bookId);
		this.updatePlaceholderVisibility();
	}

	public updateListElement(bookId: string): void {
		const book: Book | undefined = this.library.find(book => book.id === bookId);
		if (book) {
			book.read = !book.read;
		}
	}

	public updatePlaceholderVisibility(): void {
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
