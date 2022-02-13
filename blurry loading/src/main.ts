import './sass/main.scss';

const loadingTextEl = document.getElementById('loading-text') as HTMLSpanElement;
const backgroundEl = document.querySelector('.bg') as HTMLDivElement;

let progress = 0;

let int = setInterval(() => {
	progress++;

	if (progress > 99) {
		clearInterval(int);
	}

	backgroundEl.style.filter = `blur(${30 - (progress / 100) * 30}px)`;
	loadingTextEl.innerText = loadingTextEl.innerText = `${progress}%`;
	loadingTextEl.style.opacity = `${1 - progress / 100}`;
}, 30);
