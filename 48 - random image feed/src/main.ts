import './sass/main.scss';

const imageContainerEl = document.getElementById('images') as HTMLDivElement;
const randomImageUrl = 'https://source.unsplash.com/random/';

const rowCount = 5;
const columnCount = 8;

imageContainerEl.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

for (let i = 0; i < rowCount * columnCount; i++) {
	const imageEl = document.createElement('img');
	imageEl.src = `${randomImageUrl}/300x300/?sig=${Math.floor(Math.random() * 100)}`;
	console.log(imageEl.src);
	imageContainerEl.appendChild(imageEl);
}
