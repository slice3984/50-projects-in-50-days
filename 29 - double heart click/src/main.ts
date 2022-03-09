import './sass/main.scss';

const imageWrapperEl = document.querySelector('.image') as HTMLDivElement;
const timesEl = document.getElementById('times') as HTMLSpanElement;

let prevClickTime = 0;

imageWrapperEl.addEventListener('click', (e) => {
	const currentTime = new Date().getTime();

	if (!prevClickTime) {
		prevClickTime = currentTime;
	} else if (currentTime - prevClickTime < 800) {
		createHeart(e);

		const amountClicked = parseInt(timesEl.innerText) + 1;
		timesEl.innerText = amountClicked.toString();

		prevClickTime = 0;
	} else {
		prevClickTime = currentTime;
	}
});

function createHeart(e: MouseEvent): void {
	const heartEl = document.createElement('i');
	heartEl.className = 'heart';
	heartEl.innerText = '❤';

	const posX = e.offsetX;
	const posY = e.offsetY;

	heartEl.style.top = `${posY}px`;
	heartEl.style.left = `${posX}px`;

	imageWrapperEl.appendChild(heartEl);
	setTimeout(() => heartEl.remove(), 600);
}
