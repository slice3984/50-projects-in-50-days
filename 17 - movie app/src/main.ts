import './sass/main.scss';

interface ApiMovieSearchResult {
	results: {
		id: string;
		title: string;
		description: string;
		image: string;
	}[];
}

interface ApiTop250Result {
	items: {
		id: string;
		title: string;
		imDbRating: string;
		image: string;
	}[];
}

interface Movie {
	id: string;
	title: string;
	rating: string;
	description: string;
	image: string;
}

const mainEl = document.querySelector('.main') as HTMLDivElement;
const formEl = document.getElementById('form') as HTMLFormElement;
const serchInputEl = document.getElementById('search') as HTMLInputElement;

// https://imdb-api.com/ API Key
const apiKey = '';

// Endpoints
const urlTop250 = `https://imdb-api.com/en/API/Top250Movies/${apiKey}`;
const urlSearch = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/`;
const urlRating = `https://imdb-api.com/en/API/Ratings/${apiKey}/`;

async function apiRequest<T>(url: string): Promise<T> {
	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(res.statusText);
	} else {
		return (await res.json()) as Promise<T>;
	}
}

function renderMovies(movies: Movie[]): void {
	mainEl.innerHTML = '';

	movies.forEach((movie) => {
		const rating = parseFloat(movie.rating);
		let ratingColor: string;

		if (rating >= 8) {
			ratingColor = 'green';
		} else if (rating >= 5) {
			ratingColor = 'orange';
		} else {
			ratingColor = 'red';
		}

		const movieEl = document.createElement('div');
		movieEl.className = 'movie';

		movieEl.innerHTML = `
        <img
            src="${movie.image}"
            alt="cover ${movie.title}"
            class="movie__img"
        />
        <div class="movie__info">
            <h3 class="movie__title">${movie.title}</h3>
            <span class="movie__rating ${ratingColor}">${movie.rating}</span>
        </div>
        <div class="movie__overview">
            <h3>Overview</h3>
            ${movie.description}
        </div>
        `;

		mainEl.appendChild(movieEl);
	});
}

(async () => {
	// Initial top movies
	const top250Movies = await apiRequest<ApiTop250Result>(urlTop250);

	const movies: Movie[] = [];

	for (const movie of top250Movies.items) {
		movies.push({
			id: movie.id,
			title: movie.title,
			rating: movie.imDbRating,
			description: '-',
			image: movie.image,
		});
	}

	renderMovies(movies);

	// Movie search
	formEl.addEventListener('submit', async (e) => {
		e.preventDefault();

		const searchQuery = serchInputEl.value;
		serchInputEl.value = '';

		const fetchedMovies = await apiRequest<ApiMovieSearchResult>(
			urlSearch + searchQuery
		);

		// Get ratings and create movie objects
		const movies: Movie[] = [];

		if (fetchedMovies.results.length) {
			for (const movie of fetchedMovies.results) {
				const rating = await apiRequest<{ imDb: string }>(urlRating + movie.id);
				movies.push({
					id: movie.id,
					title: movie.title,
					description: movie.description,
					image: movie.image,
					rating: rating.imDb,
				});
			}

			renderMovies(movies);
		}
	});
})();
