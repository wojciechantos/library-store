import './styles.css';
import { iconsMap } from './iconsMap.ts';
import { type IconName } from 'types.ts';

export class Icon {
	iconName: IconName;

	constructor(iconName: IconName) {
		this.iconName = iconName;
	}

	private resolveIcon(iconName: IconName): string {
		return iconsMap[iconName];
	}

	public render(): HTMLElement | null {
		const icon: string | null = this.resolveIcon(this.iconName);

		if (!icon) {
			return null;
		}

		const iconComponent: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		iconComponent.insertAdjacentHTML('afterbegin', icon);

		const svgElement: SVGElement | null = iconComponent.querySelector('svg');
		iconComponent.classList.add('icon');

		if (svgElement) {
			svgElement.classList.add('icon-svg');
		}

		return iconComponent;
	}
}
