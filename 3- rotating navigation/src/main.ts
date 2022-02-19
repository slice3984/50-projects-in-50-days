import './sass/main.scss';

const buttonEl = document.getElementById('menu')!;
const containerEl = document.querySelector('.container')!;

buttonEl.addEventListener('click', () => containerEl.classList.toggle('nav--show'));
