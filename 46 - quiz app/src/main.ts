import './sass/main.scss';

interface Question {
	question: string;
	answers: string[];
	correctAnswer: string;
}

// Thanks github copilot
const questions: Question[] = [
	{
		question: 'What is the capital of France?',
		answers: ['Paris', 'Berlin', 'London', 'Madrid'],
		correctAnswer: 'Paris',
	},
	{
		question: 'What is the capital of Germany?',
		answers: ['Berlin', 'London', 'Madrid', 'Paris'],
		correctAnswer: 'Berlin',
	},
	{
		question: 'What is the capital of Spain?',
		answers: ['Madrid', 'London', 'Berlin', 'Paris'],
		correctAnswer: 'Madrid',
	},
	{
		question: 'What is the capital of Italy?',
		answers: ['London', 'Madrid', 'Berlin', 'Paris'],
		correctAnswer: 'London',
	},
	{
		question: 'What is the capital of Austria?',
		answers: ['London', 'Madrid', 'Berlin', 'Paris'],
		correctAnswer: 'London',
	},
	{
		question: 'What is the capital of Switzerland?',
		answers: ['London', 'Madrid', 'Berlin', 'Paris'],
		correctAnswer: 'London',
	},
];

const quizContainerEl = document.getElementById('quiz') as HTMLDivElement;
const answerEls: NodeListOf<HTMLLIElement> =
	document.querySelectorAll('.quiz__answers li');
const questionEl = document.getElementById('question') as HTMLHeadingElement;
const submitEl = document.getElementById('submit') as HTMLButtonElement;

let currentQuestion = 0;
let correctAnswerCount = 0;

function renderQuestion(question: Question) {
	questionEl.textContent = question.question;

	answerEls.forEach((answerEl, index) => {
		const labelEl = answerEl.querySelector('label') as HTMLLabelElement;
		labelEl.textContent = question.answers[index];
	});
}

submitEl.addEventListener('click', () => {
	answerEls.forEach((answerEl) => {
		const inputEl = answerEl.querySelector('input') as HTMLInputElement;
		const labelEl = answerEl.querySelector('label') as HTMLLabelElement;

		if (inputEl.checked) {
			inputEl.checked = false;
			if (labelEl.textContent === questions[currentQuestion].correctAnswer) {
				correctAnswerCount++;
			}
		}
	});

	currentQuestion++;

	if (currentQuestion < questions.length) {
		renderQuestion(questions[currentQuestion]);
	} else {
		quizContainerEl.classList.add('quiz--complete');
		questionEl.textContent =
			'You scored ' + correctAnswerCount + ' out of ' + questions.length;
		submitEl.textContent = 'Restart';
		submitEl.addEventListener('click', () => {
			location.reload();
		});
	}
});

renderQuestion(questions[currentQuestion]);
