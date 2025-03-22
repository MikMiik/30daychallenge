const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function randomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

const container = $('.container');
for (let i=0; i <= 220; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
    square.addEventListener('mouseover', () => {
        const color = randomColor();
        square.style.backgroundColor = color;
        square.style.boxShadow = `${color} 0px 4px 29px 2px`;
    })
    square.addEventListener('mouseleave', () => {
        square.style.backgroundColor = '#1d1d1d';
        square.style.boxShadow = '';
    })
}



