import './sass/main.scss';

class Carousel {
	private currIdx = 0;
	private readonly imageCount: number;
	private intervalId!: number;

	constructor(private readonly wrapperEl: HTMLDivElement) {
		this.imageCount = wrapperEl.children.length;
		this.resetInterval();
	}

	private switchImage(option: 'prev' | 'next'): void {
		if (option === 'prev') {
			this.currIdx = this.currIdx - 1 < 0 ? this.imageCount - 1 : --this.currIdx;
		} else {
			this.currIdx = this.currIdx + 1 > this.imageCount - 1 ? 0 : ++this.currIdx;
		}

		this.wrapperEl.style.transform = `translateX(-${this.currIdx * 100}%)`;
	}

	private resetInterval(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}

		this.intervalId = setInterval(this.switchImage.bind(this, 'next'), 5000);
	}

	prevImage(): void {
		this.resetInterval();
		this.switchImage('prev');
	}

	nextImage(): void {
		this.resetInterval();
		this.switchImage('next');
	}
}
const carouselImgWrapperEl = document.getElementById('imgs') as HTMLDivElement;
const prevBtnEl = document.getElementById('prev') as HTMLButtonElement;
const nextBtnEl = document.getElementById('next') as HTMLButtonElement;

const carousel = new Carousel(carouselImgWrapperEl);

prevBtnEl.addEventListener('click', carousel.prevImage.bind(carousel));
nextBtnEl.addEventListener('click', carousel.nextImage.bind(carousel));
