import './styles.css';
import { Text } from 'components/common/Typography';
import { AnchorProps, AnchorVariant } from 'types.ts';

export class Anchor {
	private href: string;
	private dataTest?: string;
	private className?: string;
	private variant?: AnchorVariant;
	private content?: HTMLElement | string;

	constructor(props: AnchorProps) {
		this.href = props.href;
		this.dataTest = props.dataTest || '';
		this.className = props.className || '';
		this.variant = props.variant || 'dark';
		this.content = props.content || undefined;
	}

	private addClasses(element: HTMLAnchorElement): void {
		element.classList.add('anchor', `anchor--${this.variant}`);

		if (this.className) {
			element.classList.add(this.className);
		}
	}

	public render(): HTMLAnchorElement {
		const anchorElement: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
		this.addClasses(anchorElement);

		if (!this.href) {
			throw new Error('Anchor component does not have a required "href" attribute set!');
		} else if (this.href) {
			anchorElement.setAttribute('href', this.href);
		}

		if (!this.content) {
			const anchorText: HTMLParagraphElement = new Text({
				color: 'light',
				text: this.href,
				variant: 'body_sm',
				dataTest: this.dataTest ? `${this.dataTest}--text` : undefined,
			}).render();

			anchorElement.appendChild(anchorText);
		} else if (this.content) {
			if (typeof this.content === 'string') {
				const textElement: HTMLParagraphElement = new Text({
					color: 'light',
					text: this.content,
					variant: 'body_sm',
					dataTest: this.dataTest ? `${this.dataTest}--text` : undefined,
				}).render();

				anchorElement.appendChild(textElement);
			} else {
				anchorElement.appendChild(this.content);
			}
		}

		if (this.dataTest) {
			anchorElement.setAttribute('data-test', this.dataTest);
		}

		return anchorElement;
	}
}
