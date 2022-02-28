import './sass/main.scss';

const buttonEls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn-ripple');

buttonEls.forEach((button) => {
	button.addEventListener('click', (e) => {
		const posX = e.clientX - button.offsetLeft;
		const posY = e.clientY - button.offsetTop;

		const circleEl = document.createElement('div');
		circleEl.className = 'btn-ripple__circle';
		circleEl.style.top = `${posY}px`;
		circleEl.style.left = `${posX}px`;

		button.appendChild(circleEl);

		setTimeout(() => circleEl.remove(), 500);
	});
});
