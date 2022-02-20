import './sass/main.scss';

const faqEntryEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.faq__entry');

faqEntryEls.forEach((entry) => {
	const toggleBtnEl = entry.querySelector('button')!;
	toggleBtnEl.addEventListener('click', () =>
		entry.classList.toggle('faq__entry--active')
	);
});
