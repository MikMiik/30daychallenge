const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const preview = $('.preview');
const uploadFile = $('#pre-img');
uploadFile.addEventListener('change',() => {
    const file = uploadFile.files[0];
    console.log([file.name])
    if (!file) return;
    if (!file.name.endsWith('.jpg')) return;
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file)
    preview.appendChild(img);
});