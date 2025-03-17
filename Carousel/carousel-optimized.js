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
  src: 'img9.jpg'
}, {
  index: '10',
  src: 'img10.jpg'
}]

const wrapper = $('.wrapper');
const gallery = $('.gallery');
const carousel = $('.carousel');
const galleryImg = $('.gallery__img');
const btnClose = $('.btn__close');
const controlPre = $('.control__pre');
const controlNext = $('.control__next');
let wrapperHTML = '';

function galleryClose () {
  btnClose.addEventListener('click', () => {
    gallery.classList.add('hide');
		removeActiveImg()
  })

}
function HideControl(control) {
  control.classList.add('hide')
}
function UnhideControl(control) {
  control.classList.remove('hide')
}
function clickLayerShowControl(control) {
  gallery.addEventListener('click', (e) => {
    if(e.target === gallery) {
      UnhideControl(control)
    }
  })
}
function showGallery() {
  gallery.classList.remove('hide');
}
function removeActiveImg() {
	const activeImg = carousel.querySelector('.active') || undefined;
	if (activeImg) {
		activeImg.classList.remove('active')
	}
}
function clickLayerToClose() {
	gallery.addEventListener('click', (e) => {
		if(e.target === gallery) {
			gallery.classList.add('hide');
			removeActiveImg();
		}
	})
}
// Add wrapper DOM
imgsData.forEach((imgData) => {
	wrapperHTML +=`
	  <div class="image" data-imgurl= "${imgData.src}">
			<img src="${imgData.src}" alt="">
	  </div>  
	`
})
wrapper.innerHTML = wrapperHTML;

// Gallery Handle
const imgs = [...$$('.wrapper .image')];
imgs.forEach((img, index) => {
	let carouselImg = img.cloneNode(true); 
	carousel.appendChild(carouselImg);
	img.addEventListener('click', () =>{
		const { imgurl } = img.dataset;
		galleryImg.innerHTML = `
			<img src="${imgurl}" data-index = "${index + 1}" alt="">
		`;
		const firstImg = wrapper.querySelector(".image:first-child");
		const lastImg = wrapper.querySelector(".image:last-child");
    if (img === firstImg) {
      HideControl(controlPre);
      clickLayerShowControl(controlPre)
    } else if (img === lastImg) {
      HideControl(controlNext);
      clickLayerShowControl(controlNext)
    }
		;[...$$('.carousel img')].forEach((carouselImage) => {	
			if (carouselImage.src === galleryImg.querySelector('img').src) {
				carouselImage.parentElement.classList.add('active')
			}
		});
		galleryClose();
		clickLayerToClose()
		showGallery();
	})
})

// Control handle
const controls = [...$$('.control')]
controls.forEach((control) => {
	control.addEventListener('click', () => {
		const carouselImgs = [...$$('.carousel .image')];
		const offset = control.classList.contains('control__next') ? 1 : -1;
		let activeImg = carousel.querySelector('.active');
		let activeImgIndex = carouselImgs.indexOf(activeImg);
		let newIndex = activeImgIndex + offset;
		activeImg.classList.remove('active');
		carouselImgs[newIndex].classList.add('active');
		activeImg = carousel.querySelector('.active');
		galleryImg.innerHTML = `
			<img src="${activeImg.querySelector('img').src}" data-index = "${newIndex}" alt="">
		`;
		if (newIndex === 0 || newIndex === (carouselImgs.length - 1)) {
			HideControl(control);
		} else {
			UnhideControl(controlPre);
			UnhideControl(controlNext);
		}
	})
})





