import './sass/main.scss';
const buttonEl = document.getElementById('button') as HTMLButtonElement;
const toastContainerEl = document.getElementById('toasts') as HTMLDivElement;

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
];

buttonEl.addEventListener('click', () => createToastNotification(getRandomMessage(), 2000));

function createToastNotification(message: string, time: number): void {
    const toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.innerText = message;

    toastContainerEl.appendChild(toastEl);

    setTimeout(toastEl.remove.bind(toastEl), time);
}

function getRandomMessage(): string {
    return messages[Math.floor(Math.random() * messages.length)];
}