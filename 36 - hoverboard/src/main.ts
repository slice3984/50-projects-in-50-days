import './sass/main.scss';

const containerEl = document.getElementById('container') as HTMLDivElement;
const hexColors = ['#FF008E', '#D22779', '#612897', '#0C1E7F', '#FF6363'];

const SQUARES = 25 * 30; // 25 boxes per row

for (let i = 0; i < SQUARES; i++) {
	const squareEl = document.createElement('div');
	squareEl.className = 'square';

	squareEl.addEventListener('mouseover', () => {
		const randomColor = hexColors[Math.floor(Math.random() * hexColors.length)];
		squareEl.style.backgroundColor = randomColor;
		squareEl.style.boxShadow = `0 0 2px ${randomColor}, 0 0 10px ${randomColor}`;
	});

	squareEl.addEventListener('mouseout', () => {
		squareEl.style.backgroundColor = '#1d1d1d';
		squareEl.style.boxShadow = `0 0 2px #000`;
	});

	containerEl.appendChild(squareEl);
}
