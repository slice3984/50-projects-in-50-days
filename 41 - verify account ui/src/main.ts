import './sass/main.scss';

const codeInputEls: NodeListOf<HTMLInputElement> =
	document.querySelectorAll('.code__input');

codeInputEls[0].focus();

codeInputEls.forEach((codeEl) => {
	codeEl.addEventListener('keydown', (e) => {
		if (e.key === 'Backspace') {
			if (codeEl.previousElementSibling) {
				const prevEl = codeEl.previousElementSibling as HTMLInputElement;
				setTimeout(() => prevEl.focus(), 0);
			}
		} else {
			codeEl.value = '';

			if (codeEl.nextElementSibling) {
				const nextEl = codeEl.nextElementSibling as HTMLInputElement;
				setTimeout(() => nextEl.focus(), 0);
			} else {
				// Verify..
			}
		}
	});
});
