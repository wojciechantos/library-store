import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'components/common/Button';
import { FormItem } from 'components/common/FormItem';
import { LibraryStoreInterface, DialogInterface, AddBookFormProps } from 'types.ts';

export class AddBookForm {
	private dataTest?: string;
	private dialogInstance: DialogInterface;
	private storeInstance: LibraryStoreInterface;

	constructor(props: AddBookFormProps) {
		this.dataTest = props.dataTest || '';
		this.storeInstance = props.storeInstance;
		this.dialogInstance = props.dialogInstance;
	}

	private getFormItems(): (HTMLDivElement | HTMLInputElement | HTMLButtonElement)[] {
		const titleItem: HTMLDivElement = new FormItem({
			name: 'title',
			label: 'Title',
			maxLength: 100,
			isRequired: true,
			dataTest: this.dataTest ? `${this.dataTest}-item__title` : undefined,
		}).render();
		const authorItem: HTMLDivElement = new FormItem({
			name: 'author',
			maxLength: 100,
			label: 'Author',
			isRequired: true,
			dataTest: this.dataTest ? `${this.dataTest}-item__author` : undefined,
		}).render();
		const pagesItem: HTMLDivElement = new FormItem({
			name: 'pages',
			type: 'number',
			maxLength: 10000,
			isRequired: false,
			label: 'Number of pages',
			dataTest: this.dataTest ? `${this.dataTest}-item__pages` : undefined,
		}).render();
		const readItem: HTMLDivElement = new FormItem({
			name: 'read',
			label: 'Read',
			type: 'checkbox',
			isRequired: false,
			dataTest: this.dataTest ? `${this.dataTest}-item__read` : undefined,
		}).render();
		const formSubmitButton: HTMLButtonElement = new Button({
			type: 'submit',
			text: 'Add book',
			className: 'add-book-form__submit-button',
			dataTest: this.dataTest ? `${this.dataTest}__submit-form-button` : undefined,
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

		if (this.dataTest) {
			form.setAttribute('data-test', `${this.dataTest}__form`);
		}

		const formItems: (HTMLDivElement | HTMLInputElement | HTMLButtonElement)[] = this.getFormItems();

		formItems.forEach((item: HTMLDivElement | HTMLInputElement | HTMLButtonElement) => {
			form.appendChild(item);
		});

		form.addEventListener('submit', (e: SubmitEvent) => this.handleSubmitForm(e, form));

		return form;
	}
}
