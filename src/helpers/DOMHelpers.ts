export function mountDOMWithElement(element: Element): void {
	const appContainer: HTMLDivElement = document.createElement('div');
	appContainer.setAttribute('id', 'app-container');
	document.body.appendChild(appContainer);
	appContainer.appendChild(element);
}
