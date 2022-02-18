import './sass/main.scss';

interface Joke {
	id: string;
	joke: string;
	status: number;
}

function api<T>(url: string): Promise<T> {
	return fetch(url, {
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
	}).then((res) => {
		if (!res.ok) {
			throw new Error(res.statusText);
		} else {
			return res.json() as Promise<T>;
		}
	});
}

const jokeDivEl = document.getElementById('joke')!;
const jokeBtnEl = document.getElementById('joke-btn')!;

function setRandomJoke() {
	api<Joke>('https://icanhazdadjoke.com/').then((joke) => {
		jokeDivEl.innerText = joke.joke;
	});
}

jokeBtnEl.addEventListener('click', setRandomJoke);
setRandomJoke();
