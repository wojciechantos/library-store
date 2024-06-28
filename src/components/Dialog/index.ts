import './styles.css';
import { Button } from 'components/Button';

export class Dialog {
	constructor() {
	}

	getDialog() {
		const appContainer: HTMLElement = document.getElementById('app-container')!;
		const dialogElement: HTMLDialogElement = appContainer.querySelector<HTMLDialogElement>('.dialog')!;
		const oldShow = dialogElement.showModal;
		dialogElement.showModal = () => {
			oldShow.call(dialogElement);
			dialogElement.classList.add('show');
		};
		const oldClose = dialogElement.close;
		dialogElement.close = () => {
			dialogElement.addEventListener('transitionend', () => oldClose.call(dialogElement), { once: true });
			dialogElement.classList.remove('show');
		};
		return dialogElement;
	}

	public render(): HTMLElement {
		const addNewBookButton = new Button({ text: 'X', onClick: () => this.getDialog().close() });
		const addNewBookButtonElement: HTMLElement = addNewBookButton.render();

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

		dialogElement.querySelector('.dialog__header').appendChild(addNewBookButtonElement);

		return dialogElement;
	}
}