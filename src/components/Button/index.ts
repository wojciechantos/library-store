import './styles.css';
import { ButtonInterface, type ButtonVariant, type ButtonSize } from 'types.ts';

export class Button implements ButtonInterface {
	text: string;
	size?: ButtonSize;
	onClick?: () => void;
	variant?: ButtonVariant;

	constructor(props: ButtonInterface) {
		this.text = props.text;
		this.size = props.size ?? 'md';
		this.onClick = props.onClick;
		this.variant = props.variant ?? 'primary';
	}

	private addClasses(element: HTMLButtonElement): void {
		element.classList.add('button', `button--${this.size}`, `button--${this.variant}`);
	}

	public render(): HTMLElement {
		const buttonElement: HTMLButtonElement = document.createElement('button')!;
		this.addClasses(buttonElement);
		buttonElement.textContent = this.text;
		if (this.onClick) {
			buttonElement.addEventListener('click', this.onClick);
		}

		return buttonElement;
	}
}