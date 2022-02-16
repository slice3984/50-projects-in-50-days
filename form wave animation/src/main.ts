import './sass/main.scss';

const labelEls: NodeListOf<HTMLInputElement> =
	document.querySelectorAll('.form__control label')!;

labelEls.forEach((label) => {
	label.innerHTML = label.innerText
		.split('')
		.map(
			(char, idx) =>
				'<span class="form__letter-span"' +
				`style="transition-delay: ${idx * 30}ms">${char}</span>`
		)
		.join('');
});
