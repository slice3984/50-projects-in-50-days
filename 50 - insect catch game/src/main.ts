import './sass/main.scss';

interface InsectImage {
	src: string;
	alt: string;
}

const screenEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.screen');
const chooseInsectBtnEls: NodeListOf<HTMLButtonElement> =
	document.querySelectorAll('.choose-insect-btn');

const startBtnEl = document.getElementById('start-btn') as HTMLButtonElement;
const gameContainerEl = document.getElementById('game-container') as HTMLDivElement;

const timeEl = document.getElementById('time') as HTMLHeadingElement;
const scoreEl = document.getElementById('score') as HTMLHeadingElement;
const messageEl = document.getElementById('message') as HTMLHeadingElement;

let seconds = 0;
let score = 0;
let selectedInsect: InsectImage;

startBtnEl.addEventListener('click', () => {
	screenEls[0].classList.add('screen--up');
});

chooseInsectBtnEls.forEach((btnEl) => {
	btnEl.addEventListener('click', () => {
		const imgEl = btnEl.querySelector('img')!;
		const imgSrc = imgEl.getAttribute('src')!;
		const imgAlt = imgEl.getAttribute('alt')!;

		selectedInsect = {
			src: imgSrc,
			alt: imgAlt,
		};

		screenEls[1].classList.add('screen--up');
		setTimeout(createInsect, 1000);
		startGame();
	});
});

function startGame(): void {
	setInterval(increaseTime, 1000);
}

function increaseTime(): void {
	const minutes = Math.floor(seconds / 60);
	const leftSeconds = seconds % 60;

	const formatedMinutes = minutes < 10 ? '0' + minutes : minutes;
	const formatedSeconds = leftSeconds < 10 ? '0' + leftSeconds : leftSeconds;

	timeEl.innerText = `Time: ${formatedMinutes}:${formatedSeconds}`;
	seconds++;
}

function createInsect(): void {
	const insectEl = document.createElement('div');
	insectEl.classList.add('insect');

	const { x, y } = getRandomPosition();

	insectEl.style.top = `${y}px`;
	insectEl.style.left = `${x}px`;

	insectEl.innerHTML = `
        <img src="${selectedInsect.src}" alt="${
		selectedInsect.alt
	}" style="transform: rotate(${Math.random() * 360}deg)">
    `;

	insectEl.addEventListener('click', catchInsect);

	gameContainerEl.appendChild(insectEl);
}

function getRandomPosition(): { x: number; y: number } {
	const x = Math.floor(Math.random() * (gameContainerEl.clientWidth - 100));
	const y = Math.floor(Math.random() * (gameContainerEl.clientHeight - 100));

	return { x, y };
}

function catchInsect(this: HTMLDivElement): void {
	increaseScore();
	this.classList.add('insect--caught');
	setTimeout(() => this.remove(), 2000);

	addInsects();
}

function addInsects(): void {
	setTimeout(createInsect, 1000);
	setTimeout(createInsect, 1500);
}

function increaseScore(): void {
	score++;

	if (score > 19) {
		messageEl.classList.add('visible');
	}

	scoreEl.innerText = `Score: ${score}`;
}
