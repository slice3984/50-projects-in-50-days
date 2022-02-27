import './sass/main.scss';

const hourEl = document.querySelector('.clock__needle-hour') as HTMLDivElement;
const minuteEl = document.querySelector('.clock__needle-minute') as HTMLDivElement;
const secondEl = document.querySelector('.clock__needle-second') as HTMLDivElement;
const timeEl = document.querySelector('.clock__time') as HTMLDivElement;
const dateEl = document.querySelector('.clock__date') as HTMLDivElement;
const toggleEl = document.querySelector('.toggle') as HTMLButtonElement;

toggleEl.addEventListener('click', () => {
	const htmlEl = document.documentElement;

	toggleEl.innerText = htmlEl.classList.toggle('dark') ? 'Light mode' : 'Dark mode';
});

function setTime() {
	const dateObj = new Date();
	const monthName = dateObj.toLocaleString('default', { month: 'short' });
	const dayName = dateObj.toLocaleString('default', { weekday: 'long' });
	const date = dateObj.getDate();
	const hours = dateObj.getHours() % 12;
	const minutes = dateObj.getMinutes();
	const seconds = dateObj.getSeconds();

	// Fix spinning needles
	hourEl.style.transition = `${hours === 0 ? 'none' : 'all 500ms ease-in'}`;
	minuteEl.style.transition = `${minutes === 0 ? 'none' : 'all 500ms ease-in'}`;
	secondEl.style.transition = `${seconds === 0 ? 'none' : 'all 500ms ease-in'}`;

	hourEl.style.transform = `translate(-50%, -100%) rotate(${mapToDegree(
		12,
		hours
	)}deg)`;

	minuteEl.style.transform = `translate(-50%, -100%) rotate(${mapToDegree(
		60,
		minutes
	)}deg)`;

	secondEl.style.transform = `translate(-50%, -100%) rotate(${mapToDegree(
		60,
		seconds
	)}deg)`;

	timeEl.innerText = dateObj.toLocaleTimeString();
	dateEl.innerHTML = `${dayName}, ${monthName} <span class="circle">${date}</span>`;
}

function mapToDegree(max: number, current: number) {
	return (360 / max) * current;
}

setTime();
setInterval(setTime, 1000);
