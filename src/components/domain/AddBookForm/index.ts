import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'components/common/Button';
import { FormItem } from 'components/common/FormItem';
import { LibraryStoreInterface, DialogInterface } from 'types.ts';

export class AddBookForm {
	private dialogInstance: DialogInterface;
	private storeInstance: LibraryStoreInterface;

	constructor(storeInstance: LibraryStoreInterface, dialogInstance: DialogInterface) {
		this.storeInstance = storeInstance;
		this.dialogInstance = dialogInstance;
	}

	private getFormItems(): (HTMLDivElement | HTMLInputElement | HTMLButtonElement)[] {
		const titleItem: HTMLDivElement = new FormItem({
			name: 'title',
			label: 'Title',
			type: 'text',
			isRequired: true,
			maxLength: 100,
		}).render();
		const readItem: HTMLDivElement = new FormItem({
			name: 'read',
			label: 'Read',
			type: 'checkbox',
			isRequired: false,
		}).render();
		const authorItem: HTMLDivElement = new FormItem({
			name: 'author',
			label: 'Author',
			type: 'text',
			isRequired: true,
			maxLength: 100,
		}).render();
		const pagesItem: HTMLDivElement = new FormItem({
			name: 'pages',
			label: 'Number of pages',
			type: 'number',
			isRequired: false,
			maxLength: 10000,
		}).render();
		const formSubmitButton: HTMLButtonElement = new Button({
			text: 'Add book',
			type: 'submit',
			className: 'add-book-form__submit-button',
		}).render();

		return [titleItem, authorItem, pagesItem, readItem, formSubmitButton];
	}

	private handleSubmitForm(e: SubmitEvent, form: HTMLFormElement): void {
		e.preventDefault();
		const formData: FormData = new FormData(e.target as HTMLFormElement);
		const bookData: Record<string, FormDataEntryValue> = {};

		formData.forEach((value: FormDataEntryValue, key: string) => {
			bookData[key] = value;
		});

		this.storeInstance.addListElement({
			id: `book-${uuidv4()}`,
			title: bookData.title as string,
			author: bookData.author as string,
			pages: Number(bookData.pages),
			read: bookData.read === 'on',
		});

		this.storeInstance.updatePlaceholderVisibility();
		form.reset();
		this.dialogInstance.getDialog().close();
	}

	public render(): HTMLFormElement {
		const form: HTMLFormElement = document.createElement('form') as HTMLFormElement;
		form.classList.add('add-book-form');
		form.setAttribute('id', 'add-book-form');
		form.method = 'dialog';
		const formItems: (HTMLDivElement | HTMLInputElement | HTMLButtonElement)[] = this.getFormItems();

		formItems.forEach((item: HTMLDivElement | HTMLInputElement | HTMLButtonElement) => {
			form.appendChild(item);
		});

		form.addEventListener('submit', (e: SubmitEvent) => this.handleSubmitForm(e, form));

		return form;
	}
}
