import './sass/main.scss';

const leftSlideEl = document.querySelector('.slider__left') as HTMLDivElement;
const rightSlideEl = document.querySelector('.slider__right') as HTMLDivElement;
const upBtnEl = document.querySelector('.slider__up') as HTMLButtonElement;
const downBtnEl = document.querySelector('.slider__down') as HTMLButtonElement;
const slidesLength = rightSlideEl.querySelectorAll('div').length;

let activeSlideIdx = 0;

leftSlideEl.style.top = `-${(slidesLength - 1) * 100}vh`;

upBtnEl.addEventListener('click', () => changeSlide('up'));
downBtnEl.addEventListener('click', () => changeSlide('down'));

function changeSlide(direction: 'up' | 'down'): void {
	if (direction === 'up') {
		activeSlideIdx = activeSlideIdx + 1 > slidesLength - 1 ? 0 : ++activeSlideIdx;
	} else {
		activeSlideIdx = activeSlideIdx - 1 < 0 ? slidesLength - 1 : --activeSlideIdx;
	}

	rightSlideEl.style.transform = `translateY(-${activeSlideIdx * 100}vh)`;
	leftSlideEl.style.transform = `translateY(${activeSlideIdx * 100}vh)`;
}
