import './styles.css';
import { DialogInterface } from 'types.ts';
import { Button } from 'components/common/Button';

export class Dialog implements DialogInterface {
	private content?: HTMLElement | string;

	constructor() {
	}

	public set dialogContent(dialogContent: HTMLElement | string) {
		this.content = dialogContent;
	}

	public getDialog(): HTMLDialogElement {
		const appContainer: HTMLElement = document.getElementById('app-container')!;
		const dialogElement: HTMLDialogElement = appContainer.querySelector<HTMLDialogElement>('.dialog')!;
		const oldShow = dialogElement.showModal;
		const oldClose = dialogElement.close;

		dialogElement.showModal = (): void => {
			oldShow.call(dialogElement);
			dialogElement.classList.add('show');
		};

		dialogElement.close = (): void => {
			dialogElement.classList.remove('show');
			setTimeout(() => oldClose.call(dialogElement), 20)
		};

		return dialogElement;
	}

	public render(): HTMLDialogElement {
		const closeDialogButton: HTMLButtonElement = new Button({ text: 'X', onClick: () => this.getDialog().close() }).render();

		const dialogElement: HTMLDialogElement = document.createElement('dialog') as HTMLDialogElement;
		dialogElement.classList.add('dialog');

		dialogElement.innerHTML = `
			<div class="dialog__content">
				<div class="dialog__header">
					<h2>Add new book</h2>
				</div>
				<div class="dialog__body"></div>
			</div>
		`;

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