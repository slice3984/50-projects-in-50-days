import './sass/main.scss';

const cardHeaderEl = document.getElementById('header') as HTMLDivElement;
const cardTitleEl = document.getElementById('title') as HTMLHeadingElement;
const cardExcerptEl = document.getElementById('excerpt') as HTMLParagraphElement;
const cardAuthorImgEl = document.getElementById('profile-img') as HTMLDivElement;
const cardAuthorNameEl = document.getElementById('name') as HTMLSpanElement;
const cardAuthorDateEl = document.getElementById('date') as HTMLSpanElement;

const animatedBgEls: NodeListOf<HTMLElement> = document.querySelectorAll('.animated-bg');
const animatedBgTextEls: NodeListOf<HTMLElement> =
	document.querySelectorAll('.animated-bg__text');

function getData(): void {
	cardHeaderEl.innerHTML = `
    <img
        src="https://source.unsplash.com/random/600x600"
        alt="randomg image"
    />
    `;

	cardTitleEl.innerText = `
    Lorem ipsum dolor sit amet.
    `;

	cardExcerptEl.innerHTML = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, vel?
    `;

	cardAuthorImgEl.innerHTML = `
    <img
        src="https://randomuser.me/api/portraits/men/45.jpg"
        alt=""
    />
    `;

	cardAuthorNameEl.innerText = 'John Doe';
	cardAuthorDateEl.innerText = 'Oct, 08, 2022';

	animatedBgEls.forEach((bgEl) => bgEl.classList.remove('animated-bg'));
	animatedBgTextEls.forEach((bgEl) => bgEl.classList.remove('animated-bg__text'));
}

setTimeout(getData, 2000);
