import './sass/main.scss';

const contentEls: NodeListOf<HTMLElement> = document.querySelectorAll('.phone__content');
const navLiEls: NodeListOf<HTMLLIElement> = document.querySelectorAll('nav li');

let activeContentEl: HTMLElement;
let activeNavLiEl: HTMLLIElement;

navLiEls.forEach((liEl, idx) => {
	liEl.addEventListener('click', () => displayTab(idx));
});

function displayTab(idx: number): void {
	if (activeContentEl && activeNavLiEl) {
		activeContentEl.classList.remove('phone--show');
		activeNavLiEl.classList.remove('active');
	}

	activeContentEl = contentEls.item(idx);
	activeContentEl.classList.add('phone--show');

	activeNavLiEl = navLiEls.item(idx);
	activeNavLiEl.classList.add('active');
}
