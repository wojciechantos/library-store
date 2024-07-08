import { assert } from 'vitest';
import { Button } from './index.ts';
import { ButtonProps } from 'types.ts';
import { mountDOMWithElement } from 'helpers/mountDOMWithElement.ts';

test('should render Button component with default set of props', () => {
	let isButtonClicked = false;
	const button: HTMLButtonElement = new Button({}).render();
	mountDOMWithElement(button);

	assert.strictEqual(button.textContent, '');
	assert.ok(button.classList.contains('button'));
	assert.ok(button.classList.contains('button--md'));
	assert.ok(button.classList.contains('button--primary'));
	assert.strictEqual(button.getAttribute('type'), 'button');
	button.click();
	button.onclick = () => (isButtonClicked = true);
	assert.strictEqual(isButtonClicked, false);
	assert.strictEqual(button.getElementsByClassName('icon').length, 0);
});

test('should render Button component with given set of props', () => {
	const customButtonProps: ButtonProps = {
		size: 'xs',
		text: 'Click',
		type: 'submit',
		iconName: 'plus',
		variant: 'secondary',
		className: 'custom-class',
		onClick: () => (isButtonClicked = true),
	};

	const button: HTMLButtonElement = new Button({ ...customButtonProps }).render();
	mountDOMWithElement(button);
	let isButtonClicked = false;

	assert.ok(button.classList.contains('button--xs'));
	assert.strictEqual(button.textContent?.trim(), 'Click');
	assert.strictEqual(button.getAttribute('type'), 'submit');
	assert.strictEqual(button.getElementsByClassName('icon').length, 1);
	assert.ok(button.classList.contains('button--secondary'));
	assert.ok(button.classList.contains('custom-class'));
	button.click();
	button.onclick = () => (isButtonClicked = true);
	assert.strictEqual(isButtonClicked, true);
});
