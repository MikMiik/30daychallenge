const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const imgsData = [{
  index: '1',
  src: 'img1.jpg'
}, {
  index: '2',
  src: 'img2.jpg'
}, {
  index: '3',
  src: 'img3.jpg'
}, {
  index: '4',
  src: 'img4.jpg'
}, {
  index: '5',
  src: 'img5.jpg'
}, {
  index: '6',
  src: 'img6.jpg'
}, {
  index: '7',
  src: 'img7.jpg'
}, {
  index: '8',
  src: 'img8.jpg'
}, {
  index: '9',
  src: 'img1.jpg'
}]

const wrapper = $('.wrapper')
const gallery = $('.gallery')
let html = '';

// Dom imgs in wrapper
imgsData.forEach((imgData) => {
  html +=`
    <div class="image" data-imgurl= "${imgData.src}">
      <img src="${imgData.src}" alt="">
    </div>  
`
})
wrapper.innerHTML = html;

// Query Dom
const imgs = $$('.image');
const imgsArray = Array.from(imgs);
const galleryImg = $('.gallery__img');
const firstImg = wrapper.querySelector(".image:first-child");
const lastImg = wrapper.querySelector(".image:last-child");
const controlPre = $('.control__pre');
const controlNext = $('.control__next');
const btnClose = $('.btn__close');
// Create function
function galleryToggle (clickElement) {
  clickElement.addEventListener('click', () => {
    gallery.classList.toggle('hide');
  })
}
function HideControl(control) {
  control.classList.add('hide')
}
function UnhideControl(control) {
  control.classList.remove('hide')
}
function ClickLayerGallery(gallery, control) {
  gallery.addEventListener('click', (e) => {
    if(e.target === gallery) {
      UnhideControl(control)
    }
  })
}
function showGallery(gallery) {
  gallery.classList.remove('hide');
}

// Click img in wrapper to show gallery
imgsArray.forEach((img, index) => {
  img.addEventListener('click', () => {
    const { imgurl } = img.dataset;
    galleryImg.innerHTML = `
      <img src="${imgurl}" data-index = "${index + 1}" alt="">
    `
    showGallery(gallery)
    if (img === firstImg) {
      HideControl(controlPre);
      ClickLayerGallery(gallery, controlPre)
    } else if (img === lastImg) {
      HideControl(controlNext);
      ClickLayerGallery(gallery, controlNext)
    }
  })
})

// Hide gallery when click X
galleryToggle(btnClose)

// Hide galler when click outside img
gallery.addEventListener('click', (e) => {
  if(e.target === gallery) {
    gallery.classList.toggle('hide');
  }
})

// Handle controlPre
controlPre.addEventListener('click', () => {
  const currentImg = galleryImg.querySelector('img');
  let matchingImg;
  let { index } = currentImg.dataset;
  index = Number(index) - 1;
  imgsData.forEach((imgData) => {
    if (imgData.index == index) {
      matchingImg = imgData;
      if (index == 1) {
        HideControl(controlPre)
        ClickLayerGallery(gallery, controlPre)
      } 
    }
  })
  galleryImg.innerHTML = `
      <img src="${matchingImg.src}" data-index = "${matchingImg.index}" alt="">
  `
  if (index == (imgsData.length-1)) {
    UnhideControl(controlNext)
  }
})

// Handle controlNext
controlNext.addEventListener('click', () => {
  const currentImg = galleryImg.querySelector('img');
  let matchingImg;
  let { index } = currentImg.dataset;
  index = Number(index) + 1;
  imgsData.forEach((imgData) => {
    if (imgData.index == index) {
      matchingImg = imgData;
      if (index == imgsData.length) {
        HideControl(controlNext)
        ClickLayerGallery(gallery, controlNext)
      }
    }
  })
  galleryImg.innerHTML = `
      <img src="${matchingImg.src}" data-index = "${matchingImg.index}" alt="">
  `
  if (index == 2) {
    UnhideControl(controlPre)
  }
})





