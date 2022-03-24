import './sass/main.scss';

const sliderEl = document.querySelector('.range-slider') as HTMLDivElement;
const sliderInputEl = sliderEl.querySelector('input')!;
const sliderLabelEl = sliderEl.querySelector('label')!;

function updateValueLabel() {
	const value = sliderInputEl.value;
	const percentage = +value / ((+sliderInputEl.min + +sliderInputEl.max) / 100);
	sliderLabelEl.style.left = `${percentage}%`;
	sliderLabelEl.innerText = value;
	sliderLabelEl.style.transform = `translateX(-${percentage}%)`;
}

sliderInputEl.addEventListener('input', updateValueLabel);

updateValueLabel();
