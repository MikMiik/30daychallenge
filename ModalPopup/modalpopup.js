const btnClose = document.querySelector('.btn__close');
const btnOpen = document.querySelector('.btn__open');
const iconClose = document.querySelector('.fa-xmark');
const modal = document.querySelector('.modal');
const elements = [btnClose, btnOpen, iconClose, modal];
elements.forEach((element) => {
  if (element) {
    element.addEventListener('click', (e) => {
      e.stopPropagation()
      modal.classList.toggle('hide')
    })
  }
})
