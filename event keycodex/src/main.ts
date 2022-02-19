import './sass/main.scss';
const infoEl = document.querySelector('.keycodes__info') as HTMLHeadElement;
const keyCodesWrapperEl = document.querySelector('.keycodes__codes')!;
const keyEl = document.getElementById('key')!;
const keyCodeEl = document.getElementById('keycode')!;
const codeEl = document.getElementById('code')!;

window.addEventListener('keydown', (e) => {
	const key = e.key === ' ' ? 'WHITESPACE' : e.key;
	const keyCode = e.keyCode;
	const code = e.code;

	infoEl.innerText = `Key: ${key}`;

	keyEl.innerText = key;
	keyCodeEl.innerText = keyCode.toString();
	codeEl.innerText = code;

	keyCodesWrapperEl.classList.remove('hidden');
});
