import './sass/main.scss';

const backgroundEl = document.getElementById('background') as HTMLDivElement;
const passwordInputEl = document.getElementById('password') as HTMLInputElement;

passwordInputEl.addEventListener('input', () => {
	const decreaseStep = passwordInputEl.value.length * (20 / 10);
	backgroundEl.style.filter = `blur(${20 - decreaseStep}px)`;
});
