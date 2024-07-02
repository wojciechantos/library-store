import './styles.css';
import { ButtonProps, type ButtonVariant, type ButtonSize, type ButtonType } from 'types.ts';

export class Button {
	private text: string;
	private size?: ButtonSize;
	private type?: ButtonType;
	private onClick?: () => void;
	private variant?: ButtonVariant;

	constructor(props: ButtonProps) {
		this.text = props.text;
		this.onClick = props.onClick;
		this.size = props.size || 'md';
		this.type = props.type || 'button';
		this.variant = props.variant || 'primary';
	}

	private addClasses(element: HTMLButtonElement): void {
		element.classList.add('button', `button--${this.size}`, `button--${this.variant}`);
	}

	public render(): HTMLButtonElement {
		const buttonElement: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
		this.addClasses(buttonElement);
		buttonElement.textContent = this.text;

		if (this.type) {
			buttonElement.type = this.type;
		}

		if (this.onClick) {
			buttonElement.addEventListener('click', this.onClick);
		}

		return buttonElement;
	}
}