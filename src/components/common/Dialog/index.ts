import './styles.css';
import { Button } from 'components/common/Button';
import { DialogProps, DialogInterface } from 'types';
import { Heading, Text } from 'components/common/Typography';

export class Dialog implements DialogInterface {
	private title?: string;
	private dataTest?: string;
	private content?: HTMLElement | string;

	constructor(props: DialogProps) {
		this.title = props.title || '';
		this.dataTest = props.dataTest || '';
	}

	public set dialogContent(content: HTMLElement | string) {
		this.content = content || '';
	}

	public getDialog(): HTMLDialogElement {
		const appContainer: HTMLElement = document.getElementById('app-container')!;
		const dialogElement: HTMLDialogElement = appContainer.querySelector<HTMLDialogElement>('.dialog')!;
		const oldShow = dialogElement.showModal;
		const oldClose = dialogElement.close;

		dialogElement.showModal = (): void => {
			oldShow?.call(dialogElement);
			dialogElement.classList.add('show');
		};

		dialogElement.close = (): void => {
			dialogElement.classList.remove('show');
			setTimeout(() => oldClose?.call(dialogElement), 20);
		};

		return dialogElement;
	}

	public render(): HTMLDialogElement {
		const closeDialogButton: HTMLButtonElement = new Button({
			size: 'xs',
			iconName: 'cross',
			variant: 'transparent',
			className: 'dialog__close-button',
			dataTest: this.dataTest ? `${this.dataTest}__close-dialog` : undefined,
			onClick: () => this.getDialog().close(),
		}).render();

		const dialogElement: HTMLDialogElement = document.createElement('dialog') as HTMLDialogElement;
		dialogElement.classList.add('dialog');

		if (this.dataTest) {
			dialogElement.setAttribute('data-test', `${this.dataTest}__dialog`);
		}

		dialogElement.innerHTML = `
			<div class="dialog__content">
				<div class="dialog__header"></div>
				<div class="dialog__body"></div>
			</div>
		`;

		if (this.title) {
			const dialogTitle: HTMLHeadingElement = new Heading({
				level: 2,
				text: this.title,
				dataTest: 'dialog-title',
			}).render();

			dialogElement.querySelector<HTMLDivElement>('.dialog__header')!.appendChild(dialogTitle);
		}

		dialogElement.querySelector<HTMLDivElement>('.dialog__header')!.appendChild(closeDialogButton);
		const dialogBody: HTMLDivElement = dialogElement.querySelector<HTMLDivElement>('.dialog__body')!;

		if (this.content) {
			if (typeof this.content === 'string') {
				const stringContent: HTMLParagraphElement = new Text({ text: this.content }).render();
				dialogBody.appendChild(stringContent);

				if (this.dataTest) {
					dialogBody.setAttribute('data-test', `${this.dataTest}__dialog-body`);
				}
			} else {
				dialogBody.appendChild(this.content);
			}
		}

		return dialogElement;
	}
}
