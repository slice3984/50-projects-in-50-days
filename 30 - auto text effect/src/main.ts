import './sass/main.scss';
const autoTextEls: NodeListOf<HTMLElement> = document.querySelectorAll('.auto-text');

autoTextEls.forEach((el) => {
	const text = el.dataset.text;
	const speed = parseInt(el.dataset.speed || '1');

	if (!text) {
		return;
	}

	// Time for each character to appear
	const displaySpeed = 1000 / speed;

	let currIdx = 0;
	setInterval(() => {
		const letter = text.slice(currIdx, currIdx + 1);
		currIdx = currIdx > text.length ? 0 : ++currIdx;

		// Clear the text
		if (!currIdx) {
			el.textContent = '';
		}

		if (el.textContent) {
			el.textContent = el.textContent.slice(0, -1);
		}

		el.textContent += `${letter}_`;
	}, displaySpeed);
});
