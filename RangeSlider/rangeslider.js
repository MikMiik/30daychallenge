const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slider = $('.slider');
const process = $('.process');
const layer = $('.layer')

slider.addEventListener('mousemove',(e) => {
    
    const processWidth = (e.offsetX / 6);
    process.style.width = `${processWidth}%`;
    const percent = $('.process span');
    const roundPercent = Math.round(processWidth);
    percent.innerText = `${roundPercent}%`;
    layer.style.backgroundColor = `rgba(0,0,0,${processWidth}%)`;
})