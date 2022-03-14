import './sass/main.scss';

const numEls: NodeListOf<HTMLSpanElement> =
	document.querySelectorAll('.counter__nums span');
const counterEl = document.querySelector('.counter') as HTMLDivElement;
const finalMessageEl = document.querySelector('.final') as HTMLDivElement;
const replayBtnEl = document.getElementById('replay') as HTMLButtonElement;

runAnimation();

function resetDom(): void {
	counterEl.classList.remove('hide');
	finalMessageEl.classList.remove('show');

	numEls.forEach((numEl) => {
		numEl.className = '';
	});

	numEls[0].classList.add('counter--in');
}

function runAnimation(): void {
	numEls.forEach((numEl, idx) => {
		numEl.addEventListener('animationend', (e) => {
			const target = e.target as HTMLSpanElement;

			if (e.animationName === 'goIn' && idx !== numEls.length - 1) {
				target.classList.remove('counter--in');
				target.classList.add('counter--out');
			} else if (e.animationName === 'goOut' && target.nextElementSibling) {
				target.nextElementSibling.classList.add('counter--in');
			} else {
				counterEl.classList.add('hide');
				finalMessageEl.classList.add('show');
			}
		});
	});
}

replayBtnEl.addEventListener('click', () => {
	resetDom();
	runAnimation();
});
