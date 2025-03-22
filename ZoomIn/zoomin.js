const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $('.container');
const mirror = $('.mirror');
const scope = 1.5;

container.addEventListener('mousemove', (e) => {
    const containerCdn = container.getBoundingClientRect();
    const cursorX = (e.offsetX / containerCdn.width)*100;
    const cursorY = (e.offsetY / containerCdn.height)*100;
    mirror.style.backgroundSize = `${containerCdn.width*scope}px ${containerCdn.height*scope}px`;
    mirror.style.left = `${e.offsetX}px`;
    mirror.style.top = `${e.offsetY}px`;
    mirror.style.backgroundPosition = `${cursorX}% ${cursorY}%`
    mirror.hidden = false
})
container.addEventListener('mouseleave', () => {
    mirror.hidden = true;
})