import './sass/main.scss';

const openBtnEl = document.querySelector('.nav__btn-open') as HTMLButtonElement;
const closeBtnEl = document.querySelector('.nav__btn-close') as HTMLButtonElement;
const navEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.nav');

openBtnEl.addEventListener('click', () => {
	navEls.forEach((navEl) => navEl.classList.add('nav--visible'));
});

closeBtnEl.addEventListener('click', () => {
	navEls.forEach((navEl) => navEl.classList.remove('nav--visible'));
});
