const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const canvas = $('canvas');
const ctx = canvas.getContext('2d');
const color = $('.color');

ctx.lineWidth = 10;
const pos1 = {
    x: 0,
    y: 0
}
const pos2 = {
    x: 0,
    y: 0
}
let isDrawing = false;
let colorPaint = '#000';
let history = [];
function saveState() {
    history.push(canvas.toDataURL());
}

canvas.addEventListener('mousedown', (e) => {
    saveState();
    isDrawing = true;
    pos1.x = e.offsetX;
    pos1.y = e.offsetY;

    ctx.strokeStyle = colorPaint;
    ctx.lineWidth = initSize;
    ctx.fillStyle = colorPaint;

    ctx.beginPath();
    ctx.arc(pos1.x, pos1.y, initSize/2, 0, 2 * Math.PI);
    ctx.fill();
})

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        pos2.x = e.offsetX;
        pos2.y = e.offsetY;

        ctx.strokeStyle = colorPaint;
        ctx.lineWidth = initSize;
        ctx.fillStyle = colorPaint;

        ctx.beginPath();
        ctx.arc(pos2.x, pos2.y, initSize/2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();
        pos1.x = pos2.x;
        pos1.y = pos2.y;
    }
})
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
})

color.addEventListener('change', () => {
    colorPaint = color.value;
})

const size = $('.size');
let initSize = 10;
const controlSizes = [...$$('[control-size]')];
controlSizes.forEach((controlSize) => {
    controlSize.addEventListener('click', () => {
        const offset = (controlSize.classList.contains('increase')) ? 2 : -2;
        initSize = initSize + offset;
        size.innerText = initSize;
    })
})

const eraser = $('.eraser');
eraser.addEventListener('click', () => {
    eraser.classList.toggle('active');
    if (eraser.classList.contains('active')) {
        colorPaint = '#fff';
    } else {
        colorPaint = color.value;
    }
})

const deleteAll = $('.delete');
deleteAll.addEventListener('click', () => {
    const ctxCdn = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, ctxCdn.width, ctxCdn.height);
})

const save = $('.save')
save.addEventListener('click', () => {
    const dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    save.href = dataURL; 
    save.download = 'img.png';
})

function saveCanvasToIndexedDB() {
    const dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    const request = indexedDB.open("CanvasDB", 1); 
    request.onupgradeneeded = function (e) {
        const db = e.target.result;
        db.createObjectStore("images", { keyPath: "id" }); 
    };

    request.onsuccess = function (e) {
        const db = e.target.result;
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
        store.put({ id: 1, image: dataURL }); 
    };
}

window.addEventListener('beforeunload', saveCanvasToIndexedDB);

function loadCanvasFromIndexedDB() {
    const request = indexedDB.open("CanvasDB", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("images", "readonly");
        const store = transaction.objectStore("images");
        const getRequest = store.get(1); 

        getRequest.onsuccess = function () {
            if (getRequest.result) {
                const img = new Image();
                img.src = getRequest.result.image;
                img.onload = function () {
                    ctx.drawImage(img, 0, 0); 
                };
            }
        };
    };
}

window.addEventListener('load', loadCanvasFromIndexedDB);

function undo() {
    if (history.length === 0) return;
        let lastState = history.pop();
        let img = new Image();
        img.src = lastState;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
}
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
        undo();
    }
})