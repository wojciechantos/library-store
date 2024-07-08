import { assert } from 'vitest';
import { Dialog } from './index.ts';
import { mountDOMWithElement } from 'helpers/mountDOMWithElement.ts';

describe('Dialog component with default configuration', () => {
	const dialog = new Dialog();
	let dialogRender: HTMLDialogElement;

	beforeAll(() => {
		dialogRender = dialog.render();
		mountDOMWithElement(dialogRender);
	});

	test('should render Dialog component with no custom title or content', () => {
		assert.strictEqual(dialogRender.classList.contains('dialog'), true);
		assert.strictEqual(dialogRender.getElementsByClassName('dialog__content').length, 1);
		assert.strictEqual(dialogRender.getElementsByClassName('dialog__header').length, 1);
		assert.strictEqual(dialogRender.getElementsByClassName('dialog__body').length, 1);

		const dialogHeader: HTMLDivElement = dialogRender.querySelector('.dialog__header')!;
		assert.strictEqual(dialogHeader.getElementsByClassName('dialog__close-button').length, 1);
		assert.strictEqual(dialogHeader.getElementsByTagName('h2').length, 0);

		const dialogBody: HTMLDivElement = dialogRender.querySelector('.dialog__body')!;
		assert.strictEqual(dialogBody.innerHTML, '');
	});

	test('should correctly open Dialog component and respond to close button click', () => {
		dialog.getDialog().showModal();
		assert.strictEqual(dialogRender.classList.contains('show'), true);

		const closeButton: HTMLButtonElement = dialogRender.querySelector('.dialog__close-button')!;
		closeButton.click();

		assert.strictEqual(dialogRender.classList.contains('show'), false);
	});
});

describe('Dialog component with custom title and content', () => {
	const dialog = new Dialog('Custom title');

	beforeAll(() => {
		mountDOMWithElement(dialog.render());
	});

	test('should render Dialog component with custom title', () => {
		const dialogRender: HTMLDialogElement = dialog.render();

		const dialogHeader: HTMLDivElement = dialogRender.querySelector('.dialog__header')!;
		assert.strictEqual(dialogHeader.textContent?.trim(), 'Custom title');
	});

	test('should render Dialog component with custom string content', () => {
		dialog.dialogContent = 'Test string content';

		const dialogRender: HTMLDialogElement = dialog.render();

		const dialogBody: HTMLDivElement = dialogRender.querySelector('.dialog__body')!;
		assert.strictEqual(dialogBody.textContent?.trim(), 'Test string content');
	});

	test('should render Dialog component with custom HTML content', () => {
		const dialogContent: HTMLDivElement = document.createElement('div');
		dialogContent.textContent = 'Dialog test content';
		dialog.dialogContent = dialogContent;
		const dialogRender: HTMLDialogElement = dialog.render();

		const dialogBody: HTMLDivElement = dialogRender.querySelector('.dialog__body')!;
		assert.strictEqual(dialogBody.innerHTML.includes(`<div>Dialog test content</div>`), true);
	});
});
