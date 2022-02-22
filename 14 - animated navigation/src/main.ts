import './sass/main.scss';

const navEl = document.getElementById('nav')!;
const btnToggleEl = document.getElementById('toggle')!;

btnToggleEl.addEventListener('click', () => {
	navEl.classList.toggle('nav--active');
});
