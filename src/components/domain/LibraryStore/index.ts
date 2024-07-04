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

		for (let i: number = 0; i < localStorage.length; i++) {
			const key: string | null = localStorage.key(i);
			if (key?.startsWith('book-')) {
				const keyValue: string | null = localStorage.getItem(key);
				if (keyValue) {
					const value: Book = JSON.parse(keyValue);
					this.addListElement(value);
				}
			}
		}

		this.updatePlaceholderVisibility();
	}

	public addListElement(book: Book): void {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		const listItem = new ListItem(book, () => this.removeListElement(book.id), () => this.updateListElementStatus(book.id));
		const listItemElement: HTMLElement = listItem.render();
		booksList.appendChild(listItemElement);
		this.library.push(book);
		localStorage.setItem(book.id, JSON.stringify(book));
	}

	public removeListElement(bookId: string): void {
		const booksList: HTMLElement = document.getElementById('books-list')!;
		const listItemElement: Element | null = booksList.querySelector(`[data-id="${bookId}"]`);

		if (listItemElement) {
			localStorage.removeItem(bookId);
			booksList.removeChild(listItemElement);
			this.library = this.library.filter(book => book.id !== bookId);
			this.updatePlaceholderVisibility();
		}
	}

	public updateListElementStatus(bookId: string): void {
		let book: Book | undefined;
		const bookValue: string | null = localStorage.getItem(bookId);

		if (bookValue) {
			book = JSON.parse(bookValue);

			if (book) {
				book.read = !book.read;
				localStorage.setItem(bookId, JSON.stringify(book));
			}
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
