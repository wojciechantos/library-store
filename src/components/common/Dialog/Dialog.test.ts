import { assert } from 'vitest';
import { Dialog } from './index.ts';

test('should render empty dialog with no custom title or content', () => {
	const dialog = new Dialog();
	const dialogElement: HTMLDialogElement = dialog.render();

	assert.ok(dialogElement);
	assert.strictEqual(dialogElement.classList.contains('dialog'), true);
	assert.strictEqual(dialogElement.getElementsByClassName('dialog__content').length, 1);
	assert.strictEqual(dialogElement.getElementsByClassName('dialog__header').length, 1);
	assert.strictEqual(dialogElement.getElementsByClassName('dialog__body').length, 1);

	const dialogHeader: HTMLDivElement = dialogElement.querySelector('.dialog__header')!;
	assert.strictEqual(dialogHeader.getElementsByClassName('dialog__close-button').length, 1);
	assert.strictEqual(dialogHeader.getElementsByTagName('h2').length, 0);

	const dialogBody: HTMLDivElement = dialogElement.querySelector('.dialog__body')!;
	assert.strictEqual(dialogBody.innerHTML, '');
});

test('should render dialog with custom title and HTML content', () => {
	const dialog = new Dialog('Custom title');

	const dialogContent: HTMLDivElement = document.createElement('div');
	dialogContent.textContent = 'Dialog test content';
	dialog.dialogContent = dialogContent;

	const dialogElement: HTMLDialogElement = dialog.render();

	const dialogHeader: HTMLDivElement = dialogElement.querySelector('.dialog__header')!;
	assert.strictEqual(dialogHeader.textContent?.trim(), 'Custom title');

	const dialogBody: HTMLDivElement = dialogElement.querySelector('.dialog__body')!;
	assert.strictEqual(dialogBody.innerHTML.includes(`<div>Dialog test content</div>`), true);
});

test('should render dialog with custom string content', () => {
	const dialog = new Dialog();
	dialog.dialogContent = 'Test string content';

	const dialogElement: HTMLDialogElement = dialog.render();

	const dialogBody: HTMLDivElement = dialogElement.querySelector('.dialog__body')!;
	assert.strictEqual(dialogBody.textContent?.trim(), 'Test string content');
});

test('should correctly open and respond to close modal button click', () => {
	const appContainer: HTMLDivElement = document.createElement('div');
	appContainer.setAttribute('id', 'app-container');
	document.body.appendChild(appContainer);

	const dialog = new Dialog();
	const dialogElement: HTMLDialogElement = dialog.render();
	appContainer.appendChild(dialogElement);

	dialog.getDialog().showModal();
	assert.strictEqual(dialogElement.classList.contains('show'), true);

	const closeButton: HTMLButtonElement = dialogElement.querySelector('.dialog__close-button')!;
	closeButton.click();

	assert.strictEqual(dialogElement.classList.contains('show'), false);
});
