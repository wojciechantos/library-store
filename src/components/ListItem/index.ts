import { Button } from 'components/Button';
import { checkedIcon, ListItemInterface, uncheckedIcon } from 'types.ts';
import './styles.css';

export class ListItem implements ListItemInterface {
	id: string;
	title: string;
	pages: number;
	read: boolean;
	author: string;
	onRemoveClick: () => void;
	onToggleClick: (itemId: string) => void;

	constructor(item: ListItemInterface, onRemoveClick: () => void, onToggleClick: () => void) {
		this.id = item.id;
		this.read = item.read;
		this.title = item.title;
		this.pages = item.pages;
		this.author = item.author;
		this.onRemoveClick = onRemoveClick;
		this.onToggleClick = onToggleClick;
	}

	private addClasses(element: HTMLLIElement): void {
		element.classList.add('list-item');
	}

	private toggleReadButton(itemId: string): void {
		this.read = !this.read;

		const readIconElement = document.querySelector(`.list-item[data-id="${this.id}"] .read-icon`)!;
		readIconElement.innerHTML = this.read ? checkedIcon : uncheckedIcon;

		this.onToggleClick(itemId);
	}

	public render(): HTMLElement {
		const listElement: HTMLLIElement = document.createElement('li')!;
		listElement.setAttribute('data-id', this.id);
		this.addClasses(listElement);

		listElement.innerHTML = `
			<div class="list-item__description-wrapper">
				<p><strong>Title:</strong> ${this.title}</p>
				<p><strong>Author:</strong> ${this.author}</p>
				<p><strong>Number of pages:</strong> ${this.pages.toString()}</p>
				<p><strong>Read:</strong> <span class="read-icon">${this.read ? checkedIcon : uncheckedIcon}</span></p>
			</div>
			<div class="list-item__buttons-wrapper">
			</div>
		`;

		const buttonsWrapper: HTMLDivElement = listElement.querySelector<HTMLDivElement>('.list-item__buttons-wrapper')!;

		const removeItemButton = new Button({
			size: 'sm',
			text: 'Remove book',
			variant: 'secondary',
			onClick: this.onRemoveClick
		});
		const toggleReadButton = new Button({
			size: 'sm',
			variant: 'secondary',
			onClick: () => this.toggleReadButton(this.id),
			text: this.read ? 'Mark as unread' : 'Mark as read'
		});

		const removeItemButtonElement: HTMLElement = removeItemButton.render();
		const toggleReadButtonElement: HTMLElement = toggleReadButton.render();

		buttonsWrapper.appendChild(removeItemButtonElement);
		buttonsWrapper.appendChild(toggleReadButtonElement);

		return listElement;
	}
}
