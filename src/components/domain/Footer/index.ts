import './styles.css';
import { type IconName } from 'types';
import { Icon } from 'components/common/Icon';
import { Anchor } from 'components/common/Anchor';
import { Text } from 'components/common/Typography';

export class Footer {
	private createFooter(): HTMLElement {
		const footerElement: HTMLElement = document.createElement('footer');
		footerElement.classList.add('app-footer');
		footerElement.setAttribute('id', 'app-footer');
		footerElement.setAttribute('data-test', 'app-footer');

		return footerElement;
	}

	private createFooterCaptions(): HTMLParagraphElement {
		const currentYear: number = new Date().getFullYear();

		return new Text({
			color: 'light',
			variant: 'captions',
			dataTest: 'footer-captions',
			text: `${currentYear} | Created by`,
		}).render();
	}

	private createFooterLink(text: string, link: string, iconName: IconName, dataTest: string): HTMLAnchorElement {
		const contentWrapper: HTMLDivElement = document.createElement('div');
		contentWrapper.classList.add('footer-item__content-wrapper');
		const linkText: HTMLParagraphElement = new Text({
			color: 'light',
			variant: 'body_sm',
			text: text,
		}).render();
		const icon: HTMLDivElement = new Icon(iconName).render();
		contentWrapper.appendChild(linkText);
		contentWrapper.appendChild(icon);

		return new Anchor({
			variant: 'light',
			content: contentWrapper,
			dataTest: dataTest,
			href: link,
		}).render();
	}

	private createFooterElement(text: string, icon: IconName, dataTest: string): HTMLDivElement {
		const textElement: HTMLParagraphElement = new Text({
			text,
			color: 'light',
			variant: 'body_sm',
			dataTest: dataTest,
		}).render();
		const contentWrapper: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		contentWrapper.classList.add('footer-item__content-wrapper');
		contentWrapper.appendChild(textElement);
		const iconElement: HTMLDivElement = new Icon(icon).render();
		contentWrapper.appendChild(iconElement);

		return contentWrapper;
	}

	public render(): HTMLElement {
		const footerElement: HTMLElement = this.createFooter();
		const footerCaptions: HTMLParagraphElement = this.createFooterCaptions();

		const githubLink: HTMLAnchorElement = this.createFooterLink(
			'@wojciechantos',
			'https://github.com/wojciechantos',
			'github',
			'footer-link__github'
		);

		const linkedInLink: HTMLAnchorElement = this.createFooterLink(
			'Visit my profile',
			'https://www.linkedin.com/in/wojciech-antos-b33621242/',
			'linkedIn',
			'footer-link__linked-in'
		);

		const emailAddress: HTMLDivElement = this.createFooterElement(
			'aweb.wojciechantos@gmail.com',
			'gmail',
			'footer__email-address'
		);

		footerElement.appendChild(footerCaptions);
		footerElement.appendChild(githubLink);
		footerElement.appendChild(linkedInLink);
		footerElement.appendChild(emailAddress);

		return footerElement;
	}
}
