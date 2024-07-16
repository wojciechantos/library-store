import { assert } from 'vitest';
import { Icon } from './index.ts';
import { mountDOMWithElement } from 'helpers/DOMHelpers.ts';

test('should render Icon component with given icon name', () => {
	const icon: HTMLDivElement = new Icon('plus').render();
	mountDOMWithElement(icon);

	assert.strictEqual(
		icon.innerHTML.includes(
			`<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512" class="icon-svg"><path d="M17,11H13V7a1,1,0,0,0-2,0v4H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V13h4a1,1,0,0,0,0-2Z"></path></svg>`
		),
		true
	);
});
