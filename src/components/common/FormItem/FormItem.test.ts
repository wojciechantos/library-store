import { assert } from 'vitest';
import { FormItem } from './index.ts';
import { mountDOMWithElement } from 'helpers/DOMHelpers.ts';

describe('FormItem component with default configuration', () => {
	test('should render component with minimum required props', () => {
		const defaultProps = { name: 'default-item', label: 'Default item' };

		const formItem = new FormItem({ ...defaultProps });
		const formItemRender: HTMLDivElement | HTMLInputElement = formItem.render();

		mountDOMWithElement(formItemRender);

		const label: HTMLLabelElement = formItemRender.querySelector<HTMLLabelElement>('label')!;
		const input: HTMLInputElement = formItemRender.querySelector<HTMLInputElement>('input')!;

		assert.strictEqual(formItemRender.classList.contains('form-item'), true);
		assert.ok(formItemRender.contains(label));
		assert.strictEqual(label.getAttribute('for'), 'form-item__input--default-item');
		assert.strictEqual(label.textContent?.trim(), 'Default item');

		assert.ok(formItemRender.contains(input));
		assert.strictEqual(input.getAttribute('id'), 'form-item__input--default-item');
		assert.strictEqual(input.getAttribute('type'), 'text');
		assert.strictEqual(input.getAttribute('name'), 'default-item');
		assert.strictEqual(input.classList.contains('form-item__input'), true);
	});

	test('should render component with number type and custom props', () => {
		const numberItemProps = {
			maxLength: 10,
			isRequired: true,
			type: 'number',
			name: 'number-item',
			label: 'Number item',
		};

		const formItem = new FormItem({ ...numberItemProps });
		const formItemRender: HTMLDivElement | HTMLInputElement = formItem.render();

		mountDOMWithElement(formItemRender);

		const label: HTMLLabelElement = formItemRender.querySelector<HTMLLabelElement>('label')!;
		const input: HTMLInputElement = formItemRender.querySelector<HTMLInputElement>('input')!;
		const requiredMark: HTMLSpanElement =
			formItemRender.querySelector<HTMLSpanElement>('.form-item__required-mark')!;

		assert.strictEqual(formItemRender.classList.contains('form-item'), true);
		assert.ok(formItemRender.contains(label));
		assert.strictEqual(label.getAttribute('for'), 'form-item__input--number-item');
		assert.ok(label.contains(requiredMark));

		assert.strictEqual(input.classList.contains('form-item__input'), true);
		assert.strictEqual(label.textContent?.trim(), '*Number item');
		assert.strictEqual(input.getAttribute('id'), 'form-item__input--number-item');
		assert.strictEqual(input.getAttribute('type'), 'number');
		assert.strictEqual(input.getAttribute('name'), 'number-item');
		assert.strictEqual(input.getAttributeNames().includes('required'), true);
		assert.strictEqual(input.getAttribute('maxlength'), '10');
	});

	test('should render component with checkbox type and custom props', () => {
		const checkboxItemProps = {
			type: 'checkbox',
			name: 'checkbox-item',
			label: 'Checkbox item',
		};

		const formItem = new FormItem({ ...checkboxItemProps });
		const formItemRender: HTMLDivElement | HTMLInputElement = formItem.render();

		mountDOMWithElement(formItemRender);

		const input: HTMLInputElement = formItemRender.querySelector<HTMLInputElement>('input')!;

		assert.strictEqual(formItemRender.classList.contains('form-item--inline'), true);
		assert.strictEqual(input.getAttribute('id'), 'form-item__input-checkbox-checkbox-item');
		assert.strictEqual(input.getAttribute('type'), 'checkbox');
		assert.strictEqual(input.classList.contains('form-item__input-checkbox'), true);
	});
});
