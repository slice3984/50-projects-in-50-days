import './sass/main.scss';

const divEls: HTMLDivElement[] = [];
const containerEl = document.getElementById('content')!;

// Generate divs
for (let i = 0; i < 20; i++) {
	const divEl = document.createElement('div');
	divEl.classList.add('box');
	divEl.innerHTML = `<h2>Box ${i + 1}</h2>`;
	divEls.push(divEl);
	containerEl.appendChild(divEl);
}

checkBoxes();
window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
	const triggerBottom = window.innerHeight * 0.85;

	divEls.forEach((box) => {
		const boxTopPosition = box.getBoundingClientRect().top;

		if (boxTopPosition < triggerBottom) {
			box.classList.add('box--show');
		} else {
			box.classList.remove('box--show');
		}
	});
}
