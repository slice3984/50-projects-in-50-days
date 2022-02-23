import './sass/main.scss';

const counterEls: NodeListOf<HTMLDivElement> =
	document.querySelectorAll('.counter__number')!;

counterEls.forEach((counter) => {
	const finishTime = 2000;
	const updateFrequency = 20;
	const counterTarget = parseInt(counter.dataset.target!);

	let iteration = 0;

	const updateInterval = setInterval(() => {
		iteration++;
		const requiredIncrement = counterTarget / (finishTime / updateFrequency);
		const currentCount = iteration * requiredIncrement;

		counter.innerText = currentCount.toString();

		if (currentCount >= counterTarget) {
			clearInterval(updateInterval);
		}
	}, updateFrequency);
});
