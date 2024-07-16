import './styles.css';
import { TextProps } from 'types';

export class Text {
	text: string;
	dataTest?: string;
	className?: string;
	color?: 'dark' | 'light';
	textAlign?: 'left' | 'center' | 'right';
	fontWeight?: 'light' | 'normal' | 'bold';
	variant?: 'captions' | 'body_sm' | 'body' | 'body_lg';

	constructor(props: TextProps) {
		this.text = props.text;
		this.color = props.color || 'dark';
		this.dataTest = props.dataTest || '';
		this.className = props.className || '';
		this.variant = props.variant || 'body';
		this.textAlign = props.textAlign || 'left';
		this.fontWeight = props.fontWeight || 'light';
	}

	private addClasses(element: HTMLParagraphElement): void {
		element.classList.add(
			'text',
			`text__color--${this.color}`,
			`text__align--${this.textAlign}`,
			`text__variant--${this.variant}`,
			`text__font-weight--${this.fontWeight}`
		);

		if (this.className) {
			element.classList.add(`${this.className}`);
		}
	}

	public render(): HTMLParagraphElement {
		const textElement: HTMLParagraphElement = document.createElement('p') as HTMLParagraphElement;
		this.addClasses(textElement);

		if (this.text) {
			textElement.textContent = this.text;
		}

		if (this.dataTest) {
			textElement.setAttribute('data-test', this.dataTest);
		}

		return textElement;
	}
}
