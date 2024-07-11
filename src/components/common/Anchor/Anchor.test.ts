import { assert } from 'vitest';
import { Anchor } from './index';
import { AnchorProps } from 'types.ts';
import { mountDOMWithElement } from 'helpers/DOMHelpers.ts';

describe('Anchor component', () => {
	test('should render Anchor component with string content and default props', () => {
		const anchorProps: AnchorProps = {
			content: 'Test content',
			href: 'https://www.wikipedia.org/',
		};

		const anchor: HTMLAnchorElement = new Anchor({ ...anchorProps }).render();
		mountDOMWithElement(anchor);

		assert.strictEqual(anchor.textContent, 'Test content');
		assert.strictEqual(anchor.getAttribute('href'), 'https://www.wikipedia.org/');
		assert.strictEqual(anchor.getAttribute('data-test'), null);
		assert.ok(anchor.classList.contains('anchor'));
		assert.ok(anchor.classList.contains('anchor--dark'));
	});

	test('should render Anchor component with custom content and props', () => {
		const anchorContent: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		const anchorText: HTMLParagraphElement = document.createElement('p') as HTMLParagraphElement;
		anchorText.textContent = 'Visit my profile';
		anchorContent.appendChild(anchorText);

		const anchorProps: AnchorProps = {
			variant: 'light',
			content: anchorContent,
			dataTest: 'data-test-attribute',
			href: 'https://www.wikipedia.org/',
			className: 'custom-anchor-class-name',
		};

		const anchor: HTMLAnchorElement = new Anchor({ ...anchorProps }).render();
		mountDOMWithElement(anchor);

		assert.strictEqual(anchor.innerHTML, '<div><p>Visit my profile</p></div>');
		assert.strictEqual(anchor.getAttribute('href'), 'https://www.wikipedia.org/');
		assert.strictEqual(anchor.getAttribute('data-test'), 'data-test-attribute');
		assert.ok(anchor.classList.contains('custom-anchor-class-name'));
		assert.ok(anchor.classList.contains('anchor--light'));
	});

	test('should throw error if required "href" prop is not set', () => {
		// Type checking disabled intentionally to check Anchor error handling
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(() => new Anchor({}).render()).throw('Anchor component does not have a required "href" attribute set!');
	});
});
