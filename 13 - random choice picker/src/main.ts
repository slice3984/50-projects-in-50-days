import './sass/main.scss';

const inputTextAreaEl = document.getElementById('input') as HTMLTextAreaElement;
const tagsDivEl = document.getElementById('tags')!;

inputTextAreaEl.focus();

inputTextAreaEl.addEventListener('keyup', (e) => {
	if (e.code === 'Enter') {
		selectRandomTag();
		return;
	}

	const tags = inputTextAreaEl.value
		.split(',')
		.filter((tag) => tag.trim().length)
		.map((tag) => tag.trim());

	tagsDivEl.innerHTML = '';

	tags.forEach((tag) => {
		const tagEl = document.createElement('span');
		tagEl.className = 'choice-picker__tag';
		tagEl.innerText = tag;

		tagsDivEl.appendChild(tagEl);
	});
});

function selectRandomTag() {
	const tagEls: NodeListOf<HTMLSpanElement> = tagsDivEl.querySelectorAll('span');

	if (tagEls.length > 1) {
		inputTextAreaEl.value = '';

		const tagsArr = Array.from(tagEls);

		const randomizedTags = tagsArr
			.map((tagEl) => ({ rand: Math.random(), tagEl }))
			.sort((tag, tag2) => tag.rand - tag2.rand);

		let prevSelected: HTMLSpanElement;

		randomizedTags.forEach((tag, idx) => {
			setTimeout(() => {
				if (prevSelected) {
					prevSelected.classList.remove('choice-picker__tag--active');
				}

				prevSelected = tag.tagEl;
				tag.tagEl.classList.add('choice-picker__tag--active');
			}, (idx + 1) * 500);
		});
	}
}
