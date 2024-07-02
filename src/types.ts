export const checkedIcon: string = '&#9989;';
export const uncheckedIcon: string = '&#10060;';

export type ButtonSize = 'xs' | 'sm' | 'md';
export type ButtonVariant = 'primary' | 'secondary' | 'transparent';
export type ButtonType = 'button' | 'submit' | 'reset';

export type IconName = 'plus' | 'cross' | 'trash' | 'bookmark';


export type Book = {
	id: string;
	title: string;
	author: string;
	pages: number;
	read: boolean;
}

export interface LibraryStoreInterface {
	addListElement(param: Book): void;
	updatePlaceholderVisibility(): void;
	removeListElement(param: string): void;
	loadBooksList(): void;
}

export interface ListItemInterface {
	id: string;
	title: string;
	author: string;
	pages: number;
	read: boolean;
	onRemoveClick: () => void;
	onToggleClick: (itemId: string) => void;
}

export interface ButtonProps {
	text?: string;
	iconName?: IconName;
	size?: ButtonSize;
	type?: ButtonType,
	onClick?: () => void;
	variant?: ButtonVariant;
}

export interface FormItemProps {
	name: string;
	type?: string;
	label: string;
	isRequired?: boolean;
}

export interface DialogInterface {
	dialogContent: HTMLElement | string;
	getDialog(): HTMLDialogElement;
	render(): HTMLDialogElement;
}