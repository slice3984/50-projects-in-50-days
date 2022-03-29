import './sass/main.scss';

interface Todo {
	text: string;
	done: boolean;
}

const currentTodos: Todo[] = [];

const formEl = document.getElementById('todos') as HTMLFormElement;
const inputEl = document.getElementById('input') as HTMLInputElement;
const listEl = document.getElementById('todos-list') as HTMLUListElement;

formEl.addEventListener('submit', (e) => {
	e.preventDefault();

	if (inputEl.value) {
		addTodo({ text: inputEl.value, done: false });
		inputEl.value = '';
	}
});

loadTodos();

function addTodo(todo: Todo): void {
	const todoEl = document.createElement('li');
	todoEl.innerText = todo.text;
	todoEl.className = todo.done ? 'todos--completed' : '';

	todoEl.addEventListener('click', () => {
		todo.done = !todo.done;
		todoEl.classList.toggle('todos--completed');
		updateLs();
	});

	todoEl.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		removeTodo(todo);
	});

	listEl.appendChild(todoEl);
	currentTodos.push(todo);
	updateLs();
}

function removeTodo(todo: Todo): void {
	const index = currentTodos.indexOf(todo);
	currentTodos.splice(index, 1);
	listEl.removeChild(listEl.children[index]);
	updateLs();
}

function updateLs(): void {
	localStorage.setItem('todos', JSON.stringify(currentTodos));
}

function loadTodos(): void {
	const storedTodos = localStorage.getItem('todos');

	if (storedTodos) {
		const todos = (JSON.parse(storedTodos) as Todo[]) || [];
		todos.forEach((todo) => addTodo(todo));
	}
}
