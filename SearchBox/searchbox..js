const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchBox = $('.search-box');
const searchInput = $('.search__input');
const searchButton = $('.search__button');
searchButton.addEventListener('click', () => {
  searchBox.classList.toggle('open');
  searchInput.focus();
})
