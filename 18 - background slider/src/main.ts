import './sass/main.scss';
const bodyEl = document.body;
const slideEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.slider__slide');
const leftBtnEl = document.getElementById('left') as HTMLButtonElement;
const rightBtnEl = document.getElementById('right') as HTMLButtonElement;

let activeSlide = 1;

setBackgoundToBody();

function setBackgoundToBody() {
	bodyEl.style.backgroundImage = slideEls[activeSlide].style.backgroundImage;
}

function setActiveSlide() {
	slideEls.forEach((slide) => {
		slide.classList.remove('slider__slide--active');
	});

	slideEls[activeSlide].classList.add('slider__slide--active');
}

rightBtnEl.addEventListener('click', () => {
	activeSlide++;

	if (activeSlide > slideEls.length - 1) {
		activeSlide = 0;
	}

	setBackgoundToBody();
	setActiveSlide();
});

leftBtnEl.addEventListener('click', () => {
	activeSlide--;

	if (activeSlide < 0) {
		activeSlide = slideEls.length - 1;
	}

	setBackgoundToBody();
	setActiveSlide();
});
