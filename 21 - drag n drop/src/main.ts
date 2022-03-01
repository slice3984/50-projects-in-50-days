import './sass/main.scss';

type DragType =
	| 'dragstart'
	| 'drag'
	| 'dragend'
	| 'dragover'
	| 'dragenter'
	| 'dragleave'
	| 'drop';

type DragHandlers = Partial<
	Record<DragType, (this: HTMLDivElement, e: DragEvent) => void>
>;

const fillEl = document.querySelector('.boxes__fill') as HTMLDivElement;
const boxEls: NodeListOf<HTMLDivElement> = document.querySelectorAll('.boxes__box');

const fillElHandlers: DragHandlers = {
	dragstart: function dragStart(this: HTMLDivElement): void {
		this.classList.add('boxes__hold');

		setTimeout(() => (this.className = ''), 0);
	},
	dragend: function dragEnd(this: HTMLDivElement): void {
		this.classList.add('boxes__fill');
	},
};

const boxElsHandlers: DragHandlers = {
	dragover: function dragOver(this: HTMLDivElement, e: DragEvent): void {
		e.preventDefault();
	},
	dragenter: function dragEnter(this: HTMLDivElement, e: DragEvent): void {
		e.preventDefault();
		this.classList.add('boxes__hovered');
	},
	dragleave: function dragLeave(this: HTMLDivElement): void {
		this.classList.remove('boxes__hovered');
	},
	drop: function drop(this: HTMLDivElement): void {
		this.className = 'boxes__box';
		this.appendChild(fillEl);
	},
};

function assignEventHandlers(elem: HTMLDivElement, handlerObj: DragHandlers): void {
	for (const key in handlerObj) {
		const eventName = key as DragType;
		const handlerFunc = handlerObj[eventName]!;

		elem.addEventListener(eventName, handlerFunc);
	}
}

assignEventHandlers(fillEl, fillElHandlers);
boxEls.forEach((box) => assignEventHandlers(box, boxElsHandlers));
