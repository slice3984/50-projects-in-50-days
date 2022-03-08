import axios from 'axios';
import './sass/main.scss';

interface UserInfo {
	login: string;
	name: null | string;
	avatar_url: string;
	bio: null | string;
	followers: number;
	following: number;
	public_repos: number;
}

interface UserRepository {
	name: string;
	html_url: string;
	created_at: string;
}

const API_URL = 'https://api.github.com/';

async function api<T>(url: string): Promise<T> {
	const res = await axios.get<T>(url).catch((err) => {
		throw err;
	});

	return res.data;
}

function generateUserCard(user: UserInfo, repos: UserRepository[]): HTMLDivElement {
	const name = user.name || user.login;
	const bio = user.bio || 'No bio given';

	const repoLinks = repos
		.sort(
			(repoA, repoB) =>
				new Date(repoB.created_at).valueOf() -
				new Date(repoA.created_at).valueOf()
		)
		.slice(0, 10)
		.map((repo) => `<a href="${repo.html_url}">${repo.name}</a>`);

	const cardEl = document.createElement('div');
	cardEl.className = 'card';

	cardEl.innerHTML = `
    <div class="card__avatar">
        <img src="${user.avatar_url}" alt="${name}" />
    </div>
    <div class="card__user">
        <h2>${name}</h2>
        <p>${bio}</p>
        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div class="card__repos" id="repos">${repoLinks.join('\n')}</div>
    </div>
    `;

	return cardEl;
}

function generateErrorCard(message: string): HTMLDivElement {
	const errorCardEl = document.createElement('div');
	errorCardEl.className = 'card';

	errorCardEl.innerHTML = `<h1>${message}</h1>`;

	return errorCardEl;
}

(async () => {
	const mainEl = document.getElementById('main') as HTMLDivElement;
	const formEl = document.getElementById('form') as HTMLFormElement;
	const searchInputEl = document.getElementById('search') as HTMLInputElement;

	formEl.addEventListener('submit', async (e) => {
		e.preventDefault();

		const input = searchInputEl.value;

		if (input) {
			try {
				const userInfo = await api<UserInfo>(API_URL + `users/${input}`);
				const userRepos = await api<UserRepository[]>(
					API_URL + `users/${input}/repos`
				);

				mainEl.innerHTML = '';
				mainEl.appendChild(generateUserCard(userInfo, userRepos));
			} catch (e) {
				if (axios.isAxiosError(e)) {
					mainEl.innerHTML = '';
					mainEl.appendChild(generateErrorCard('User not found'));
				} else {
					mainEl.innerHTML = '';
					mainEl.appendChild(generateErrorCard('Unknown error'));
				}
			}

			searchInputEl.value = '';
		}
	});
})();
