import './sass/main.scss';

// General
const resultEl = document.getElementById('result') as HTMLSpanElement;
const clipboardBtnEl = document.getElementById('clipboard') as HTMLButtonElement;
const generateBtnEl = document.getElementById('generate') as HTMLButtonElement;

// Settings
const pwLengthInputEl = document.getElementById('length') as HTMLInputElement;
const lowerCaseCbEl = document.getElementById('lowercase') as HTMLInputElement;
const upperCaseCbEl = document.getElementById('uppercase') as HTMLInputElement;
const numbersCbEl = document.getElementById('numbers') as HTMLInputElement;
const symbolsCbEl = document.getElementById('symbols') as HTMLInputElement;

generateBtnEl.addEventListener('click', () => {
	const hasLower = lowerCaseCbEl.checked;
	const hasUpper = upperCaseCbEl.checked;
	const hasNumbers = numbersCbEl.checked;
	const hasSymbols = symbolsCbEl.checked;

	if (!(hasLower || hasUpper || hasNumbers || hasSymbols)) {
		return;
	}

	resultEl.innerText = '';

	const passwordLength = parseInt(pwLengthInputEl.value);

	const funcs: Function[] = [];

	if (hasLower && hasUpper) {
		funcs.push(generateRandomLetter.bind(null, 'both'));
	} else if (hasLower) {
		funcs.push(generateRandomLetter.bind(null, 'lower'));
	} else if (hasUpper) {
		funcs.push(generateRandomLetter.bind(null, 'upper'));
	}

	if (hasNumbers) {
		funcs.push(generateRandomNumber);
	}

	if (hasSymbols) {
		funcs.push(generateRandomSymbol);
	}

	for (let i = 0; i < passwordLength; i++) {
		const randomFunc = funcs[getRandomNumber(0, funcs.length - 1)];
		resultEl.innerText += randomFunc();
	}
});

clipboardBtnEl.addEventListener('click', () => {
	const textAreaEl = document.createElement('textarea');
	const password = resultEl.textContent;

	if (!password) {
		return;
	}

	navigator.clipboard.writeText(password);
	alert('Password copied');
});

function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomLetter(type: 'lower' | 'upper' | 'both'): string {
	let letter: string;
	const randNum = getRandomNumber(1, 26);

	const upperChar = String.fromCharCode(64 + randNum);
	const lowerChar = String.fromCharCode(96 + randNum);

	switch (type) {
		case 'lower':
			letter = lowerChar;
			break;
		case 'upper':
			letter = upperChar;
			break;
		default:
			letter = Math.random() > 0.5 ? upperChar : lowerChar;
	}

	return letter;
}

function generateRandomNumber(): number {
	return Math.floor(Math.random() * 10);
}

function generateRandomSymbol(): string {
	const symbols = '!@#$%&{[]}=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
