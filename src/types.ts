export const checkedIcon = '&#9989;';
export const uncheckedIcon = '&#10060;';

export type ButtonSize = 'xs' | 'sm' | 'md';
export type ButtonVariant = 'primary' | 'secondary' | 'transparent';
export type ButtonType = 'button' | 'submit' | 'reset';

export type AnchorVariant = 'light' | 'dark';

export type IconName = 'plus' | 'cross' | 'trash' | 'bookmark' | 'gmail' | 'linkedIn' | 'github';

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

export interface ListItemProps {
	item: Book;
	dataTest?: string;
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

export interface AddBookFormProps {
	dataTest?: string;
	dialogInstance: DialogInterface;
	storeInstance: LibraryStoreInterface;
}

export interface FormItemProps {
	name: string;
	type?: string;
	label: string;
	dataTest?: string;
	maxLength?: number;
	isRequired?: boolean;
}

export interface DialogProps {
	title?: string;
	dataTest?: string;
}

export interface DialogInterface {
	render(): HTMLDialogElement;
	getDialog(): HTMLDialogElement;
	dialogContent: HTMLElement | string;
}

export interface AnchorProps {
	href: string;
	dataTest?: string;
	className?: string;
	variant?: AnchorVariant;
	content?: HTMLElement | string;
}

export interface HeadingProps {
	text: string;
	dataTest?: string;
	className?: string;
	level: 1 | 2 | 3 | 4 | 5 | 6;
	fontWeight?: 'normal' | 'bold';
	textAlign?: 'left' | 'center' | 'right';
}
export interface TextProps {
	text: string;
	dataTest?: string;
	className?: string;
	color?: 'dark' | 'light';
	textAlign?: 'left' | 'center' | 'right';
	fontWeight?: 'light' | 'normal' | 'bold';
	variant?: 'captions' | 'body_sm' | 'body' | 'body_lg';
}
