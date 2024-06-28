import './styles.css';
import { Book } from 'types.ts';
import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog';
import { LibraryStore } from 'components/LibraryStore';

export class App {
	libraryStore: LibraryStore;

	constructor(library: Book[]) {
		this.libraryStore = new LibraryStore(library);
	}

	init() {
		document.querySelector<HTMLDivElement>('#app-container')!.innerHTML = `
			<main>
				<header class="header-wrapper">
       				<h1>My library</h1>
    			</header>
    			<div class="books-list__wrapper">
					<ul id="books-list" class="books-list"></ul>
    				<p class="books-list__empty-list-placeholder">Here your added books will be shown...</p>
    			</div>
  			</main>
  			<footer>
        		<p>Like my work?</p>
        		<a href="https://www.linkedin.com/in/wojciech-antos-b33621242/">
            		<div class="link-wrapper">
                		Visit my 
                		<svg width="20" height="20" viewBox="0 0 2490 2490" fill="none" xmlns="http://www.w3.org/2000/svg">
                    		<path d="M0 178.366C0 79.9134 82.4229 0 184.027 0H2305.97C2407.62 0 2490 79.9134 2490 178.366V2311.66C2490 2410.14 2407.62 2490 2305.97 2490H184.027C82.4326 2490 0 2410.15 0 2311.69V178.337V178.366Z" fill="#006699"/>
                    		<path d="M756.688 2083.8V962.794H384.083V2083.8H756.727H756.688ZM570.463 809.766C700.371 809.766 781.247 723.686 781.247 616.11C778.816 506.083 700.371 422.405 572.934 422.405C445.409 422.405 362.12 506.083 362.12 616.1C362.12 723.676 442.967 809.756 568.022 809.756H570.434L570.463 809.766ZM962.93 2083.8H1335.51V1457.85C1335.51 1424.39 1337.94 1390.84 1347.78 1366.94C1374.7 1299.97 1436.01 1230.65 1538.97 1230.65C1673.76 1230.65 1727.71 1333.44 1727.71 1484.16V2083.8H2100.28V1441.05C2100.28 1096.74 1916.48 936.512 1671.34 936.512C1470.36 936.512 1382.1 1048.84 1333.05 1125.35H1335.54V962.833H962.949C967.813 1068 962.92 2083.84 962.92 2083.84L962.93 2083.8Z" fill="white"/>
                		</svg>
                		profile
            		</div>
        		</a>

       			<div class="link-wrapper">
            		aweb.wojciechantos@gmail.com
           			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                		<path d="M1.36367 17.8012H4.54547V10.0739L0 6.66479V16.4376C0 17.191 0.610234 17.8012 1.36367 17.8012V17.8012Z" fill="#4285F4"/>
                		<path d="M15.4551 17.8012H18.6369C19.3903 17.8012 20.0005 17.1909 20.0005 16.4375V6.66479L15.4551 10.0739V17.8012Z" fill="#34A853"/>
                		<path d="M15.4551 4.16503V10.0741L20.0005 6.66503V4.84686C20.0005 3.16163 18.0767 2.19913 16.7278 3.2105L15.4551 4.16503Z" fill="#FBBC04"/>
                		<path fill-rule="evenodd" clip-rule="evenodd" d="M4.54492 10.0739V4.16479L9.99945 8.25573L15.454 4.16479V10.0739L9.99945 14.1648L4.54492 10.0739Z" fill="#EA4335"/>
                		<path d="M0 4.84662V6.66479L4.54547 10.0739V4.16479L3.27273 3.21025C1.92383 2.19889 0 3.16139 0 4.84654V4.84662Z" fill="#C5221F"/>
            		</svg>
       			</div>
    			</footer>
		`;

		const addNewBookDialog = new Dialog();
		const addNewBookButton = new Button({
			text: '+ Add new book',
			onClick: () => addNewBookDialog.getDialog().showModal()
		});
		const addNewBookButtonElement: HTMLElement = addNewBookButton.render();
		const addNewBookDialogElement: HTMLElement = addNewBookDialog.render();

		document.querySelector<HTMLDivElement>('.header-wrapper')!.appendChild(addNewBookButtonElement);
		document.getElementById<HTMLDivElement>('app-container')!.appendChild(addNewBookDialogElement);

		this.libraryStore.loadBooksList();
	}
}
