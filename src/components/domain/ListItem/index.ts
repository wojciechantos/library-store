import './styles.css';
import { Button } from 'components/common/Button';
import { checkedIcon, uncheckedIcon, ListItemProps } from 'types.ts';

export class ListItem {
	id: string;
	title: string;
	pages: number;
	read: boolean;
	author: string;
	dataTest?: string;
	onRemoveClick: () => void;
	onToggleClick: (itemId: string) => void;

	constructor(props: ListItemProps) {
		this.id = props.item.id;
		this.read = props.item.read;
		this.title = props.item.title;
		this.pages = props.item.pages;
		this.author = props.item.author;
		this.dataTest = props.dataTest || '';
		this.onRemoveClick = props.onRemoveClick;
		this.onToggleClick = props.onToggleClick;
	}

	private addClasses(element: HTMLLIElement): void {
		element.classList.add('list-item');
	}

	private toggleReadButton(itemId: string): void {
		this.read = !this.read;

		const readIconElement: Element | null = document.querySelector<Element>(
			`.list-item[data-id="${this.id}"] .read-icon`
		)!;

		if (readIconElement) {
			readIconElement.innerHTML = this.read ? checkedIcon : uncheckedIcon;
		}

		this.onToggleClick(itemId);
	}

	public render(): HTMLElement {
		const listElement: HTMLLIElement = document.createElement('li') as HTMLLIElement;
		listElement.setAttribute('data-id', this.id);
		this.addClasses(listElement);

		if (this.dataTest) {
			listElement.setAttribute('data-test', this.dataTest);
		}

		// TODO: Rework to ListItemDescription component
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

		const removeItemButton: HTMLButtonElement = new Button({
			size: 'sm',
			iconName: 'trash',
			variant: 'secondary',
			text: 'Remove book',
			onClick: this.onRemoveClick,
		}).render();

		const toggleReadButton: HTMLButtonElement = new Button({
			size: 'sm',
			variant: 'secondary',
			text: 'Mark book',
			onClick: () => this.toggleReadButton(this.id),
			iconName: 'bookmark',
		}).render();

		const buttonsWrapper: HTMLDivElement =
			listElement.querySelector<HTMLDivElement>('.list-item__buttons-wrapper')!;

		buttonsWrapper.appendChild(removeItemButton);
		buttonsWrapper.appendChild(toggleReadButton);

		return listElement;
	}
}
