import './sass/main.scss';

const navEl = document.querySelector('.nav') as HTMLDivElement;

window.addEventListener('scroll', () => {
	if (window.scrollY > window.innerHeight / 2) {
		navEl.classList.add('nav--active');
	} else {
		navEl.classList.remove('nav--active');
	}
});
