import './sass/main.scss';

const panelEl = document.getElementById('panel') as HTMLDivElement;
const ratingEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.panel__rating');
const sendBtnEl = document.getElementById('send') as HTMLButtonElement;

let selectedRating = 'Satisfied';

panelEl.addEventListener('click', (e) => {
	const target = e.target as HTMLElement;
	const parentEl = target.parentElement;

	if (parentEl?.classList.contains('panel__rating')) {
		ratingEls.forEach((ratingEl) =>
			ratingEl.classList.remove('panel__rating--active')
		);

		parentEl.classList.add('panel__rating--active');

		const smallEl = parentEl.querySelector('small') as HTMLSpanElement;
		selectedRating = smallEl.innerText;
	}
});

sendBtnEl.addEventListener('click', () => {
	panelEl.innerHTML = `
        <div class="heart"></div>
        <strong>Thank You!</strong>
        <br />
        <strong>Feedback ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `;
});
