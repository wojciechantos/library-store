import './styles.css';
import { FormItemProps } from 'types.ts';

export class FormItem {
	private name: string;
	private label: string;
	private type?: string;
	private maxLength?: number;
	private isRequired?: boolean;

	constructor(props: FormItemProps) {
		this.name = props.name;
		this.label = props.label;
		this.type = props.type || 'text';
		this.isRequired = props.isRequired || false;
		this.maxLength = props.maxLength || undefined;
	}

	private generateCheckBoxItem(itemWrapper: HTMLDivElement): HTMLDivElement {
		const id = `form-item__input-checkbox-${this.name}`;

		itemWrapper.innerHTML = `
            <label for="${id}">${this.isRequired ? '<span class="form-item__required-mark">*</span>' : ''} ${this.label}</label>
            <input id="${id}" class="form-item__input-checkbox">
        `;

		const inputElement: HTMLInputElement = itemWrapper.querySelector(`#${id}`) as HTMLInputElement;

		if (inputElement) {
			inputElement.name = this.name;
			inputElement.type = 'checkbox';
			inputElement.required = this.isRequired !== undefined ? this.isRequired : false;
		}

		return itemWrapper;
	}

	private generateItem(itemWrapper: HTMLDivElement): HTMLDivElement {
		const id = `form-item__input--${this.name}`;
		itemWrapper.innerHTML = `
            <label for="${id}">${this.isRequired ? '<span class="form-item__required-mark">*</span>' : ''} ${this.label}</label>
            <input id="${id}" class="form-item__input">
        `;

		const inputElement: HTMLInputElement = itemWrapper.querySelector(`#${id}`) as HTMLInputElement;

		if (inputElement) {
			inputElement.type = this.type || 'text';
			inputElement.name = this.name;
			inputElement.required = this.isRequired !== undefined ? this.isRequired : false;

			if (this.maxLength) {
				inputElement.setAttribute('maxlength', this.maxLength.toString());
			}

			if (this.type === 'number') {
				inputElement.setAttribute('min', '0');
				inputElement.setAttribute('onkeydown', 'return event.keyCode !== 69');

				if (this.maxLength) {
					inputElement.setAttribute('max', this.maxLength.toString());
				}
			}
		}

		return itemWrapper;
	}

	public render(): HTMLDivElement | HTMLInputElement {
		const itemWrapper: HTMLDivElement = document.createElement('div') as HTMLDivElement;

		if (this.type === 'checkbox') {
			itemWrapper.classList.add('form-item--inline');
			return this.generateCheckBoxItem(itemWrapper);
		}

		itemWrapper.classList.add('form-item');
		return this.generateItem(itemWrapper);
	}
}
