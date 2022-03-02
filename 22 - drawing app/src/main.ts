import './sass/main.scss';

class DrawingApp {
	// DOM Elements
	private canvasEl!: HTMLCanvasElement;
	private decreaseBtnEl!: HTMLButtonElement;
	private increaseBtnEl!: HTMLButtonElement;
	private clearBtnEl!: HTMLButtonElement;
	private colorInputEl!: HTMLInputElement;
	private sizeSpanEl!: HTMLSpanElement;

	// Context & Positions
	private canvasCtx!: CanvasRenderingContext2D;
	private posX!: number | null;
	private posY!: number | null;

	private drawingColor = '#000';
	private isPressed = false;
	private drawingSize = 20;

	constructor(
		private readonly wrapperEl: HTMLElement,
		private readonly width: number,
		private readonly height: number
	) {
		this.generateUi();
		this.initEventListeners();
	}

	private generateUi(): void {
		this.generateUiCanvas();
		this.generateUiToolbox();
	}

	private generateUiCanvas(): void {
		this.canvasEl = document.createElement('canvas');
		this.canvasEl.className = 'drawing-app__canvas';
		this.canvasEl.width = this.width;
		this.canvasEl.height = this.height;

		this.canvasCtx = this.canvasEl.getContext('2d')!;
		this.wrapperEl.appendChild(this.canvasEl);
	}

	private generateUiToolbox(): void {
		const toolBoxEl = document.createElement('div');
		toolBoxEl.className = 'drawing-app__toolbox';

		// Decrease button
		this.decreaseBtnEl = document.createElement('button');
		this.decreaseBtnEl.innerText = '-';
		toolBoxEl.appendChild(this.decreaseBtnEl);

		// Size display span
		this.sizeSpanEl = document.createElement('span');
		this.sizeSpanEl.innerText = '20';
		toolBoxEl.appendChild(this.sizeSpanEl);

		// Increase button
		this.increaseBtnEl = document.createElement('button');
		this.increaseBtnEl.innerText = '+';
		toolBoxEl.appendChild(this.increaseBtnEl);

		// Color picker input
		this.colorInputEl = document.createElement('input');
		this.colorInputEl.type = 'color';
		toolBoxEl.appendChild(this.colorInputEl);

		// Clear button
		this.clearBtnEl = document.createElement('button');
		this.clearBtnEl.innerText = 'X';
		toolBoxEl.appendChild(this.clearBtnEl);

		this.wrapperEl.appendChild(toolBoxEl);
	}

	private initEventListeners(): void {
		this.canvasEl.addEventListener('mousedown', this.handleMouseDownEvent.bind(this));
		this.canvasEl.addEventListener('mouseup', this.handleMouseUpEvent.bind(this));
		this.canvasEl.addEventListener('mousemove', this.handleMouseMoveEvent.bind(this));
		this.increaseBtnEl.addEventListener(
			'click',
			this.handleIncreaseBtnClickEvent.bind(this)
		);
		this.decreaseBtnEl.addEventListener(
			'click',
			this.handleDecreaseBtnClickEvent.bind(this)
		);
		this.colorInputEl.addEventListener(
			'change',
			this.handleColorInputChangeEvent.bind(this)
		);
		this.clearBtnEl.addEventListener(
			'click',
			this.handleClearBtnClickEvent.bind(this)
		);
	}

	private handleMouseDownEvent(e: MouseEvent): void {
		this.isPressed = true;
		this.posX = e.offsetX;
		this.posY = e.offsetY;
	}

	private handleMouseUpEvent(): void {
		this.isPressed = false;
		this.posX = null;
		this.posY = null;
	}

	private handleMouseMoveEvent(e: MouseEvent): void {
		if (this.isPressed) {
			const x2 = e.offsetX;
			const y2 = e.offsetY;

			if (this.posX && this.posY) {
				this.drawCircle(x2, y2);
				this.drawLine(this.posX, this.posY, x2, y2);

				this.posX = x2;
				this.posY = y2;
			}
		}
	}

	private updateDisplayedSize(): void {
		this.sizeSpanEl.innerText = this.drawingSize.toString();
	}

	private handleIncreaseBtnClickEvent(): void {
		this.drawingSize = this.drawingSize < 50 ? (this.drawingSize += 5) : 50;
		this.updateDisplayedSize();
	}

	private handleDecreaseBtnClickEvent(): void {
		this.drawingSize = this.drawingSize > 5 ? (this.drawingSize -= 5) : 5;
		this.updateDisplayedSize();
	}

	private handleColorInputChangeEvent(e: Event): void {
		const target = e.target as HTMLInputElement;
		this.drawingColor = target.value;
	}

	private handleClearBtnClickEvent(): void {
		this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
	}

	private drawLine(x1: number, y1: number, x2: number, y2: number): void {
		this.canvasCtx.beginPath();
		this.canvasCtx.moveTo(x1, y1);
		this.canvasCtx.lineTo(x2, y2);
		this.canvasCtx.strokeStyle = this.drawingColor;
		this.canvasCtx.lineWidth = this.drawingSize * 2;
		this.canvasCtx.stroke();
	}

	private drawCircle(x: number, y: number): void {
		this.canvasCtx.beginPath();
		this.canvasCtx.arc(x, y, this.drawingSize, 0, Math.PI * 2);
		this.canvasCtx.fillStyle = this.drawingColor;
		this.canvasCtx.fill();
	}
}

const wrapperDivEl = document.querySelector('.drawing-app') as HTMLDivElement;
const drawingApp = new DrawingApp(wrapperDivEl, 600, 600);
