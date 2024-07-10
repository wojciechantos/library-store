export const checkedIcon = '&#9989;';
export const uncheckedIcon = '&#10060;';

export type ButtonSize = 'xs' | 'sm' | 'md';
export type ButtonVariant = 'primary' | 'secondary' | 'transparent';
export type ButtonType = 'button' | 'submit' | 'reset';

export type IconName = 'plus' | 'cross' | 'trash' | 'bookmark';

export interface Book {
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
	size?: ButtonSize;
	type?: ButtonType;
	dataTest?: string;
	className?: string;
	iconName?: IconName;
	onClick?: () => void;
	variant?: ButtonVariant;
}

export interface FormItemProps {
	name: string;
	type?: string;
	label: string;
	maxLength?: number;
	isRequired?: boolean;
}

export interface DialogInterface {
	render(): HTMLDialogElement;
	getDialog(): HTMLDialogElement;
	dialogContent: HTMLElement | string;
}
