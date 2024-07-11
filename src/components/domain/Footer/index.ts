import './styles.css';
import { Icon } from 'components/common/Icon';
import { Anchor } from 'components/common/Anchor';

export class Footer {
	public render(): HTMLElement {
		const footerElement: HTMLElement = document.createElement('footer') as HTMLElement;
		footerElement.classList.add('app-footer');
		footerElement.setAttribute('id', 'app-footer');
		footerElement.setAttribute('data-test', 'app-footer');

		const currentYear = new Date().getFullYear();
		footerElement.innerHTML = `<p data-test="footer-title">Created by @wojciechantos | ${currentYear}</p>`;

		const linkedInLinkContent: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		linkedInLinkContent.classList.add('footer-item__content-wrapper');
		linkedInLinkContent.textContent = 'Visit my profile';
		const linkedInIcon: HTMLDivElement = new Icon('linkedIn').render();
		linkedInLinkContent.appendChild(linkedInIcon);

		const linkedInLink: HTMLAnchorElement = new Anchor({
			variant: 'light',
			content: linkedInLinkContent,
			dataTest: 'footer-link__linked-in',
			href: 'https://www.linkedin.com/in/wojciech-antos-b33621242/',
		}).render();

		footerElement.appendChild(linkedInLink);

		const emailAddress: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		emailAddress.setAttribute('data-test', 'footer__email-address');
		emailAddress.classList.add('footer-item__content-wrapper');
		emailAddress.textContent = 'aweb.wojciechantos@gmail.com';
		const gmailIcon: HTMLDivElement = new Icon('gmail').render();
		emailAddress.appendChild(gmailIcon);

		footerElement.appendChild(emailAddress);
		return footerElement;
	}
}
