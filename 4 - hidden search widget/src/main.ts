import './sass/main.scss';

const searchContainerEl = document.querySelector('.search')!;
const searchBtnEl = document.querySelector('button')!;
const inputEl = document.querySelector('.search__input') as HTMLInputElement;

searchBtnEl.addEventListener('click', () => {
	searchContainerEl.classList.toggle('search--active');
	inputEl.focus();
});
