import './sass/main.scss';

type PokemonType =
	| 'fire'
	| 'grass'
	| 'electric'
	| 'water'
	| 'ground'
	| 'rock'
	| 'fairy'
	| 'poison'
	| 'bug'
	| 'dragon'
	| 'psychic'
	| 'flying'
	| 'fighting'
	| 'normal';

interface PokemonTypeObj {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

interface ApiPokemon {
	id: number;
	name: string;
	types: PokemonTypeObj[];
}

const dexContainerEl = document.getElementById('dex') as HTMLDivElement;
const COUNT = 150;

const typeColors: { [type in PokemonType]: string } = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
};

const baseApiUrl = 'https://pokeapi.co/api/v2/';

async function api<T>(url: string): Promise<T> {
	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(res.statusText);
	} else {
		return res.json();
	}
}

async function getPokemon(id: number): Promise<ApiPokemon> {
	const res = await api<ApiPokemon>(baseApiUrl + `pokemon/${id}`);
	return res;
}

function createPokemonCard(pokemon: ApiPokemon): HTMLDivElement {
	const formattedId = pokemon.id.toString().padStart(3, '0');
	const formattedName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
	const typeName = pokemon.types[0].type.name.toLowerCase() as PokemonType;
	const typeColor = typeColors[typeName];

	const cardEl = document.createElement('div');
	cardEl.className = 'pokemon';
	cardEl.style.backgroundColor = typeColor;

	cardEl.innerHTML = `
    <div class="pokemon__img">
		<img
			src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png"
			alt="${pokemon.name}"
			/>
		</div>
	<div class="pokemon__info">
		<span class="pokemon__number">#${formattedId}</span>
		<h3>${formattedName}</h3>
		<small>Type <span>${typeName}</span></small>
	</div>
    `;

	return cardEl;
}

(async () => {
	for (let i = 1; i < COUNT; i++) {
		const pokemon = await getPokemon(i);
		dexContainerEl.appendChild(createPokemonCard(pokemon));
	}
})();
