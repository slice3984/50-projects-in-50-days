import './sass/main.scss';

const displayContainerEl = document.getElementById('display') as HTMLDivElement;
const btnEl = document.getElementById('btn') as HTMLButtonElement;

let x = 0;
let y = -125;
for (let i = 0; i < 16; i++) {
	if (i % 4 != 0) {
		x += 125;
	} else {
		x = 0;
		y += 125;
	}

	const boxEl = document.createElement('div');
	boxEl.className = 'display__box';
	boxEl.style.backgroundPosition = `-${x}px -${y}px`;

	displayContainerEl.appendChild(boxEl);
}

btnEl.addEventListener('click', () =>
	displayContainerEl.classList.toggle('display--big')
);
