import './sass/main.scss';

class Carousel {
	private readonly cardEls: HTMLCollection;
	private currentCard = 0;
	private autoScrollIntervalId?: number;
	private skipIteration = false;

	constructor(parentEl: HTMLElement, private readonly autoScroll: boolean) {
		this.cardEls = parentEl.children;
		this.init();
	}

	private init(): void {
		for (let i = 0; i < this.cardEls.length; i++) {
			const card = this.cardEls.item(i) as HTMLElement;

			card.style.backgroundImage = `url('${this.getRandomBackgroundImage()}')`;

			card.addEventListener('click', () => this.switchCard(i));
		}

		this.initKeyboardControls();

		if (this.autoScroll) {
			this.enableAutoScroll();
		}
	}

	switchCard(cardIndex: number, auto = false): void {
		if (!auto) {
			this.skipIteration = true;
		}

		this.cardEls.item(this.currentCard)?.classList.remove('cardbox--active');
		this.currentCard = cardIndex;
		this.cardEls.item(cardIndex)?.classList.add('cardbox--active');
	}

	private initKeyboardControls(): void {
		document.addEventListener('keydown', (event) => {
			const key = event.code;

			let newCard = this.currentCard || 0;

			switch (key) {
				case 'ArrowLeft':
					newCard--;
					break;
				case 'ArrowRight':
					newCard++;
			}

			if (newCard >= 0 && newCard < this.cardEls.length) {
				this.switchCard(newCard);
			}
		});
	}

	enableAutoScroll(): void {
		if (this.autoScrollIntervalId !== undefined) {
			return;
		}

		this.autoScrollIntervalId = setInterval(() => {
			if (this.skipIteration) {
				this.skipIteration = false;
				return;
			}

			const nextCard =
				this.currentCard + 1 === this.cardEls.length ? 0 : this.currentCard + 1;
			this.switchCard(nextCard, true);
		}, 5000);
	}

	disableAutoScroll(): void {
		if (this.autoScrollIntervalId !== undefined) {
			clearInterval(this.autoScrollIntervalId);
			this.autoScrollIntervalId = undefined;
		}
	}

	private getRandomBackgroundImage(): string {
		return `https://source.unsplash.com/random/800x800/?sig=${Math.round(
			Math.random() * 100
		)}`;
	}
}

const parentContainerEl = document.getElementById('carousel') as HTMLElement;
new Carousel(parentContainerEl, true);
