import './styles.css';
import { Button } from 'components/Button';

export class Dialog {
	constructor() {
	}

	getDialog() {
		const appContainer: HTMLElement = document.getElementById('app-container')!;
		const dialogElement: HTMLDialogElement = appContainer.querySelector<HTMLDialogElement>('.dialog')!;
		const oldShow = dialogElement.showModal;
		const oldClose = dialogElement.close;

		dialogElement.showModal = () => {
			oldShow.call(dialogElement);
			dialogElement.classList.add('show');
		};

		dialogElement.close = () => {
			dialogElement.classList.remove('show');
			setTimeout(() => oldClose.call(dialogElement), 20)
		};

		return dialogElement;
	}

	public render(): HTMLElement {
		const closeDialogButton = new Button({ text: 'X', onClick: () => this.getDialog().close() });
		const closeDialogButtonElement: HTMLElement = closeDialogButton.render();

		const dialogElement: HTMLDialogElement = document.createElement('dialog')!;
		dialogElement.classList.add('dialog');

		dialogElement.innerHTML = `
			<div class="dialog__content">
				<div class="dialog__header">
					<h2>Add new book</h2>
				</div>
				<div class="dialog__body"></div>
				<div class="dialog__footer"></div>
			</div>
		`;

		dialogElement.querySelector('.dialog__header').appendChild(closeDialogButtonElement);

		return dialogElement;
	}
}