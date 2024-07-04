import './styles.css';
import { Icon } from 'components/common/Icon';
import { ButtonProps, type ButtonVariant, type ButtonSize, type ButtonType, type IconName } from 'types.ts';

export class Button {
	private text?: string;
	private size?: ButtonSize;
	private type?: ButtonType;
	private className?: string;
	private iconName?: IconName;
	private onClick?: () => void;
	private variant?: ButtonVariant;

	constructor(props: ButtonProps) {
		this.text = props.text || '';
		this.onClick = props.onClick;
		this.iconName = props.iconName;
		this.size = props.size || 'md';
		this.type = props.type || 'button';
		this.className = props.className || '';
		this.variant = props.variant || 'primary';
	}

	private addClasses(element: HTMLButtonElement): void {
		element.classList.add('button', `button--${this.size}`, `button--${this.variant}`);

		if(this.className) {
			element.classList.add(`${this.className}`);
		}
	}

	public render(): HTMLButtonElement {
		const buttonElement: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
		this.addClasses(buttonElement);

		if (this.iconName) {
			const iconElement: HTMLElement | null = new Icon(this.iconName).render();
			if (iconElement) {
				buttonElement.appendChild(iconElement);
			}
		}

		if (this.text) {
			const textElement: HTMLElement | null = document.createElement('p') as HTMLElement;
			textElement.textContent = this.text;

			if (textElement) {
				buttonElement.appendChild(textElement);
			}
		}

		if (this.type) {
			buttonElement.type = this.type;
		}

		if (this.onClick) {
			buttonElement.addEventListener('click', this.onClick);
		}

		return buttonElement;
	}
}