const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const container = $('.container');

const dataSocials = [{
    titile: 'Facebook',
    number: 3300
}, {
    titile: 'Youtube',
    number: 1000
}, {
    titile: 'Tiktok',
    number: 9900
}]

let html = '';
dataSocials.forEach((dataSocial) => {
    html += `
        <div class="box" count>
            <div class="title">${dataSocial.titile}</div>
            <div class="number">${dataSocial.number}</div>
        </div>
    `
})
container.innerHTML = html;

const countBoxs = [...$$('[count]')];
countBoxs.forEach((countBox) => {
    const countTo = parseInt(countBox.querySelector('.number').innerText);
    let count = 0;
    const times = 100;
    const step = Math.round(countTo/times);
    const countSet = setInterval(() => {
        count += step;
        if (count > countTo) {
            clearInterval(countSet);
            countBox.querySelector('.number').innerText = countTo;
        } else {
            countBox.querySelector('.number').innerText = count;
        }
    }, 1)
})



