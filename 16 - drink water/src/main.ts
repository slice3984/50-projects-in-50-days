import './sass/main.scss';

const smallCupEls: NodeListOf<HTMLDivElement> = document.querySelectorAll(
	'.water-counter__cup:not(.water-counter__cup-big)'
);
const litersEl = document.getElementById('liters')!;
const percentageEl = document.getElementById('percentage')!;
const remainingEl = document.getElementById('remaining')!;

updateBigCup(0);

smallCupEls.forEach((cup, idx) => {
	cup.addEventListener('click', () => {
		let idxCopy = idx;

		if (smallCupEls[idxCopy].classList.contains('water-counter__cup--full')) {
			idxCopy--;
		}

		updateBigCup(idxCopy + 1);

		smallCupEls.forEach((cupEl, idx2) => {
			if (idx2 <= idxCopy) {
				cupEl.classList.add('water-counter__cup--full');
			} else {
				cupEl.classList.remove('water-counter__cup--full');
			}
		});
	});
});

function updateBigCup(fullCups: number) {
	const updatePercentage = (100 / smallCupEls.length) * fullCups;
	percentageEl.style.height = `${updatePercentage}%`;

	litersEl.innerText = `${2 - fullCups * 0.25}L`;

	if (!fullCups) {
		percentageEl.style.display = 'none';
	} else {
		percentageEl.style.display = 'flex';
		percentageEl.innerText = `${updatePercentage}%`;
	}

	if (fullCups === smallCupEls.length) {
		remainingEl.style.display = 'none';
	} else {
		remainingEl.style.display = 'flex';
	}
}
