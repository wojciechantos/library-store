import './styles.css';
import { Icon } from 'components/common/Icon';
import { ButtonProps, type IconName, type ButtonSize, type ButtonType, type ButtonVariant } from 'types.ts';

export class Button {
	private text?: string;
	private size?: ButtonSize;
	private type?: ButtonType;
	private className?: string;
	private dataTest?: string;
	private iconName?: IconName;
	private onClick?: () => void;
	private variant?: ButtonVariant;

	constructor(props: ButtonProps) {
		this.text = props.text || '';
		this.size = props.size || 'md';
		this.type = props.type || 'button';
		this.dataTest = props.dataTest || '';
		this.className = props.className || '';
		this.onClick = props.onClick || undefined;
		this.variant = props.variant || 'primary';
		this.iconName = props.iconName || undefined;
	}

	private addClasses(element: HTMLButtonElement): void {
		element.classList.add('button', `button--${this.size}`, `button--${this.variant}`);

		if (this.className) {
			element.classList.add(`${this.className}`);
		}
	}

	public render(): HTMLButtonElement {
		const buttonElement: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
		this.addClasses(buttonElement);

		if (this.text) {
			buttonElement.textContent = this.text;
		}

		if (this.iconName) {
			const iconElement: HTMLElement | null = new Icon(this.iconName).render();

			if (iconElement) {
				buttonElement.appendChild(iconElement);
			}
		}

		if (this.type) {
			buttonElement.type = this.type;
		}

		if (this.onClick) {
			buttonElement.addEventListener('click', this.onClick);
		}

		if (this.dataTest) {
			buttonElement.setAttribute('data-test', this.dataTest);
		}

		return buttonElement;
	}
}
