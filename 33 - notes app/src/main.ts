import './sass/main.scss';
import { marked } from 'marked';

const addBtnEl = document.getElementById('add') as HTMLButtonElement;

const lsNotes = localStorage.getItem('notes');

if (lsNotes) {
	const notes: string[] = JSON.parse(lsNotes);

	notes.forEach(addNewNote);
}

addBtnEl.addEventListener('click', () => addNewNote());

function addNewNote(text = ''): void {
	const noteEl = document.createElement('div');
	noteEl.className = 'note';

	noteEl.innerHTML = `
    <div class="note__header">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

	const editBtnEl = noteEl.querySelector('.edit') as HTMLButtonElement;
	const deleteBtnEl = noteEl.querySelector('.delete') as HTMLButtonElement;
	const mainEl = noteEl.querySelector('.main') as HTMLDivElement;
	const textAreaEl = noteEl.querySelector('textarea') as HTMLTextAreaElement;

	textAreaEl.value = text;
	mainEl.innerHTML = marked(text);

	deleteBtnEl.addEventListener('click', () => {
		noteEl.remove();
		updateLs();
	});

	editBtnEl.addEventListener('click', () => {
		mainEl.classList.toggle('hidden');
		textAreaEl.classList.toggle('hidden');
	});

	textAreaEl.addEventListener('input', (e) => {
		const { value } = e.target as HTMLTextAreaElement;

		mainEl.innerHTML = marked(value);

		updateLs();
	});

	document.body.appendChild(noteEl);
}

function updateLs(): void {
	const notesText = document.querySelectorAll('textarea');
	const notes: string[] = [];

	notesText.forEach((el) => {
		notes.push(el.value);
	});

	localStorage.setItem('notes', JSON.stringify(notes));
}
