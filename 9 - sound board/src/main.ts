import './sass/main.scss';

// Sounds
import clap1 from './assets/clap-808.wav';
import clap2 from './assets/clap-analog.wav';
import clap3 from './assets/clap-crushed.wav';
import clap4 from './assets/clap-fat.wav';
import clap5 from './assets/clap-slapper.wav';

import kick1 from './assets/kick-classic.wav';
import kick2 from './assets/kick-dry.wav';
import kick3 from './assets/kick-heavy.wav';
import kick4 from './assets/kick-slapback.wav';
import kick5 from './assets/kick-zapper.wav';

import snare1 from './assets/snare-analog.wav';
import snare2 from './assets/snare-block.wav';
import snare3 from './assets/snare-lofi01.wav';
import snare4 from './assets/snare-noise.wav';
import snare5 from './assets/snare-punch.wav';

interface Sounds {
	category: string;
	paths: string[];
}

const sounds: Sounds[] = [
	{
		category: 'clap',
		paths: [clap1, clap2, clap3, clap4, clap5],
	},
	{
		category: 'kick',
		paths: [kick1, kick2, kick3, kick4, kick5],
	},
	{
		category: 'snare',
		paths: [snare1, snare2, snare3, snare4, snare5],
	},
];

const soundBoardContainerEl = document.querySelector('.soundboard')!;
let currentContentDiv: HTMLDivElement | null;
let currentCategory: string;
let categoryEls: Map<string, HTMLLIElement> = new Map();

// Generate navigation
const navEl = document.querySelector('.soundboard__nav')!;

const ulEl = document.createElement('ul');

sounds.forEach((cat) => {
	const liEl = document.createElement('li');
	liEl.textContent = cat.category + 's';

	liEl.addEventListener('click', () => {
		switchTab(cat.category);
	});

	categoryEls.set(cat.category, liEl);

	ulEl.appendChild(liEl);
});

navEl.appendChild(ulEl);

function generateSelectionPage(categoryName: string): HTMLDivElement {
	const containerEl = document.createElement('div');
	containerEl.className = 'soundboard__sounds';
	const category = sounds.find((category) => category.category === categoryName)!;

	category.paths.forEach((path, idx) => {
		const buttonEl = document.createElement('button');

		buttonEl.textContent = `${category.category} #${idx + 1}`;

		buttonEl.addEventListener('click', () => {
			new Audio(path).play();
		});

		containerEl.appendChild(buttonEl);
	});

	return containerEl;
}

function switchTab(categoryName: string): void {
	if (currentCategory === categoryName) {
		return;
	}

	if (currentCategory) {
		const currentActiveLi = categoryEls.get(currentCategory)!;
		currentActiveLi.classList.toggle('soundboard__nav--active');
	}

	const newActiveEl = categoryEls.get(categoryName)!;
	newActiveEl.classList.toggle('soundboard__nav--active');

	currentCategory = categoryName;

	if (currentContentDiv) {
		currentContentDiv.remove();
	}

	currentContentDiv = generateSelectionPage(categoryName);
	soundBoardContainerEl.appendChild(currentContentDiv);
}

switchTab('clap');
