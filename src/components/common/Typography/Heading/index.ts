import './styles.css';
import { HeadingProps } from 'types';

export class Heading {
	text: string;
	dataTest?: string;
	className?: string;
	level: 1 | 2 | 3 | 4 | 5 | 6;
	fontWeight?: 'normal' | 'bold';
	textAlign?: 'left' | 'center' | 'right';

	constructor(props: HeadingProps) {
		this.text = props.text;
		this.level = props.level;
		this.dataTest = props.dataTest || '';
		this.className = props.className || '';
		this.textAlign = props.textAlign || 'left';
		this.fontWeight = props.fontWeight || 'normal';
	}

	private addClasses(element: HTMLHeadingElement): void {
		element.classList.add(
			'heading',
			`heading__align--${this.textAlign}`,
			`heading__font-weight--${this.fontWeight}`
		);

		if (this.className) {
			element.classList.add(`${this.className}`);
		}
	}

	public render(): HTMLHeadingElement {
		const headingElement: HTMLHeadingElement = document.createElement(`h${this.level}`) as HTMLHeadingElement;
		this.addClasses(headingElement);

		if (this.text) {
			headingElement.textContent = this.text;
		}

		if (this.dataTest) {
			headingElement.setAttribute('data-test', this.dataTest);
		}

		return headingElement;
	}
}
