const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const imgs = [...$$('img')];

const boxes = [...$$('.box')];
let currentTarget;

imgs.forEach((img) => {
    img.addEventListener('dragstart',() => {
        currentTarget = img;
    })
})
boxes.forEach((box) => {
    box.addEventListener('dragover',(e) => {
        if (!box.querySelector('img')) {
            box.appendChild(currentTarget)
        }
    })  
})