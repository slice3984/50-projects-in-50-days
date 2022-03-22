import './sass/main.scss';

interface ApiResponse {
	results: ApiUserData[];
}

interface ApiUserData {
	name: {
		first: string;
		last: string;
	};
	location: {
		city: string;
		country: string;
	};
	picture: {
		large: string;
	};
}

const resultsEl = document.getElementById('results') as HTMLUListElement;
const filterEl = document.getElementById('filter') as HTMLInputElement;

const api = async <T>(url: string): Promise<T> => {
	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(res.statusText);
	} else {
		return res.json();
	}
};

const generateUserEl = (user: ApiUserData): HTMLLIElement => {
	const fullName = user.name.first + ' ' + user.name.last;
	const userEl = document.createElement('li');

	userEl.innerHTML = `
    <img
        src="${user.picture.large}"
        alt="${fullName}"
    />
    <div class="user-search__info">
        <h4>${fullName}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `;

	return userEl;
};

const renderUsers = (users: ApiUserData[]): void => {
	resultsEl.innerHTML = '';

	users.forEach((user) => {
		resultsEl.appendChild(generateUserEl(user));
	});
};

(async () => {
	const res = await api<ApiResponse>('https://randomuser.me/api?results=50');
	const users = res.results;

	filterEl.addEventListener('input', (e) => {
		const query = (e.target as HTMLInputElement).value;

		const toRender = users.filter((user) => {
			const containsName =
				user.name.first.includes(query) || user.name.last.includes(query);
			const containsLocation =
				user.location.city.includes(query) ||
				user.location.country.includes(query);

			return containsName || containsLocation;
		});

		renderUsers(toRender);
	});

	renderUsers(users);
})();
