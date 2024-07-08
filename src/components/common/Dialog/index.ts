import './styles.css';
import { DialogInterface } from 'types.ts';
import { Button } from 'components/common/Button';

export class Dialog implements DialogInterface {
	private title?: string;
	private content?: HTMLElement | string;

	constructor(title?: string) {
		this.title = title || '';
	}

	public set dialogContent(content: HTMLElement | string) {
		this.content = content || '';
	}

	public getDialog(): HTMLDialogElement {
		const appContainer: HTMLElement = document.getElementById('app-container')!;
		const dialogElement: HTMLDialogElement = appContainer.querySelector('.dialog')!;
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
			onClick: () => this.getDialog().close(),
		}).render();

		const dialogElement: HTMLDialogElement = document.createElement('dialog') as HTMLDialogElement;
		dialogElement.classList.add('dialog');

		dialogElement.innerHTML = `
			<div class="dialog__content">
				<div class="dialog__header"></div>
				<div class="dialog__body"></div>
			</div>
		`;

		if (this.title) {
			const titleElement: HTMLHeadingElement = document.createElement('h2') as HTMLHeadingElement;
			titleElement.textContent = this.title;

			if (titleElement) {
				dialogElement.querySelector('.dialog__header')!.appendChild(titleElement);
			}
		}

		dialogElement.querySelector('.dialog__header')!.appendChild(closeDialogButton);
		const dialogBody: Element = dialogElement.querySelector('.dialog__body')!;

		if (this.content) {
			if (typeof this.content === 'string') {
				dialogBody.textContent = this.content;
			} else {
				dialogBody.appendChild(this.content);
			}
		}

		return dialogElement;
	}
}
