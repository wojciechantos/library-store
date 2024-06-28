export const checkedIcon: string = '&#9989;';
export const uncheckedIcon: string = '&#10060;';

export type Book = {
	id: string;
	title: string;
	author: string;
	pages: number;
	read: boolean;
}

/*
* ListItem
* */

export interface ListItemInterface {
	id: string;
	title: string;
	author: string;
	pages: number;
	read: boolean;
}

/*
* Button
* */

export type ButtonSize = 'sm' | 'md';
export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonInterface {
	text: string;
	size?: ButtonSize;
	onClick?: () => void;
	variant?: ButtonVariant;
}
