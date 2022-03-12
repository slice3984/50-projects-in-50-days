import './sass/main.scss';

const cbEls: NodeListOf<HTMLInputElement> = document.querySelectorAll('.checkbox');
const goodCbEl = document.getElementById('good') as HTMLInputElement;
const cheapCbEl = document.getElementById('cheap') as HTMLInputElement;
const fastCbEl = document.getElementById('fast') as HTMLInputElement;

cbEls.forEach((cbEl) => {
	cbEl.addEventListener('change', (e) => {
		const target = e.target as HTMLInputElement;

		if (goodCbEl.checked && cheapCbEl.checked && fastCbEl.checked) {
			if (goodCbEl === target) {
				fastCbEl.checked = false;
			}

			if (cheapCbEl === target) {
				goodCbEl.checked = false;
			}

			if (fastCbEl === target) {
				cheapCbEl.checked = false;
			}
		}
	});
});
