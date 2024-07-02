import './styles.css';
import { FormItemProps } from 'types.ts';

export class FormItem {
	private name: string;
	private label: string;
	private type?: string
	private isRequired?: boolean;

	constructor(props: FormItemProps) {
		this.name = props.name;
		this.type = props.type || 'text';
		this.label = props.label;
		this.isRequired = props.isRequired || false;
	}

	public render(): HTMLDivElement | HTMLInputElement {
		if(this.type === 'submit') {
			return this.generateSubmitItem();
		}

		const itemWrapper: HTMLDivElement = document.createElement('div') as HTMLDivElement;

		if(this.type === 'checkbox') {
			itemWrapper.classList.add('form-item--inline');
			return this.generateCheckBoxItem(itemWrapper);
		}

		itemWrapper.classList.add('form-item');
		return this.generateTextItem(itemWrapper);
	}

	private generateSubmitItem(): HTMLInputElement {
		const item: HTMLInputElement = document.createElement('input') as HTMLInputElement;
		item.name = this.name;
		item.type = 'submit';
		item.value = this.label;
		item.classList.add('form-item__input-submit');
		return item;
	}

	private generateCheckBoxItem(itemWrapper: HTMLDivElement): HTMLDivElement {
		const id = `form-item__input-checkbox-${this.name}`;

		itemWrapper.innerHTML = `
            <label for="${id}">${this.label}</label>
            <input id="${id}" class="form-item__input-checkbox">
        `;

		const inputElement: HTMLInputElement = itemWrapper.querySelector(`#${id}`) as HTMLInputElement;

		if(inputElement) {
			inputElement.name = this.name;
			inputElement.type = 'checkbox';
			inputElement.required = this.isRequired !== undefined ? this.isRequired : false;

		}

		return itemWrapper;
	}

	private generateTextItem(itemWrapper: HTMLDivElement): HTMLDivElement {
		const id = `form-item__input--${this.name}`;
		itemWrapper.innerHTML = `
            <label for="${id}">${this.label}</label>
            <input id="${id}" class="form-item__input">
        `;

		const inputElement: HTMLInputElement = itemWrapper.querySelector(`#${id}`) as HTMLInputElement;

		if (inputElement) {
			inputElement.type = this.type || 'text';
			inputElement.name = this.name;
			inputElement.required = this.isRequired !== undefined ? this.isRequired : false;
		}

		return itemWrapper;
	}
}