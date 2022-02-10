import './sass/main.scss';

class ProgressSteps {
	private progressBarEl!: HTMLDivElement;
	private nextButtonEl!: HTMLButtonElement;
	private previousButtonEl!: HTMLButtonElement;
	private readonly stepEls: HTMLDivElement[] = [];
	private currentActive = 0;

	constructor(
		private readonly containerEl: HTMLElement,
		private readonly steps: number
	) {
		this.init();
		this.setupEventListeners();
	}

	private init() {
		const progressStepsWrapperEl = document.createElement('div');
		progressStepsWrapperEl.classList.add('progress__steps');

		this.progressBarEl = document.createElement('div');
		this.progressBarEl.classList.add('progress__line');
		progressStepsWrapperEl.appendChild(this.progressBarEl);

		// Generate step elements and append them to the root container
		for (let i = 0; i < this.steps; i++) {
			const stepEl = document.createElement('div');
			stepEl.classList.add('progress__step');

			// First step is active
			if (i === 0) {
				stepEl.classList.add('progress--active');
			}

			stepEl.innerText = `${i + 1}`;
			progressStepsWrapperEl.appendChild(stepEl);
			this.stepEls.push(stepEl);
		}

		this.containerEl.appendChild(progressStepsWrapperEl);

		// Generate buttons
		this.previousButtonEl = document.createElement('button');
		this.previousButtonEl.classList.add('progress__btn');
		this.previousButtonEl.disabled = true;
		this.previousButtonEl.textContent = 'Previous';

		this.nextButtonEl = document.createElement('button');
		this.nextButtonEl.classList.add('progress__btn');
		this.nextButtonEl.textContent = 'Next';

		this.containerEl.append(this.previousButtonEl, this.nextButtonEl);
	}

	private setupEventListeners() {
		this.nextButtonEl?.addEventListener('click', () => {
			this.currentActive++;

			if (this.currentActive > this.stepEls.length) {
				this.currentActive = this.stepEls.length;
			}

			this.update();
		});

		this.previousButtonEl?.addEventListener('click', () => {
			this.currentActive--;

			if (this.currentActive < 1) {
				this.currentActive = 1;
			}

			this.update();
		});
	}

	private update() {
		this.stepEls.forEach((step, idx) => {
			if (idx < this.currentActive) {
				step.classList.add('progress--active');
			} else {
				step.classList.remove('progress--active');
			}
		});

		const activeSteps = this.stepEls.filter((step) =>
			step.classList.contains('progress--active')
		);

		this.progressBarEl!.style.width =
			((activeSteps.length - 1) / (this.stepEls.length - 1)) * 100 + '%';

		if (this.currentActive === 1) {
			this.previousButtonEl.disabled = true;
		} else if (this.currentActive === this.stepEls.length) {
			this.nextButtonEl.disabled = true;
		} else {
			this.previousButtonEl.disabled = false;
			this.nextButtonEl.disabled = false;
		}
	}
}

const rootDivEl = document.getElementById('container') as HTMLDivElement;
new ProgressSteps(rootDivEl, 6);
