import { imgsData } from "./carousel-data.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const wrapper = $('.wrapper');
const gallery = $('.gallery');
const carousel = $('.carousel');
const galleryImg = $('.gallery__img');
const btnClose = $('.btn__close');
const controlPre = $('.control__pre');
const controlNext = $('.control__next');
let wrapperHTML = '';

// Create func
function galleryClose () {
  btnClose.addEventListener('click', () => {
    gallery.classList.add('hide');
	removeActiveImg();
	UnhideControl(controlPre);
	UnhideControl(controlNext);
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
			UnhideControl(controlPre);
			UnhideControl(controlNext);
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
		;[...$$('.carousel img')].forEach((carouselImage, carouselIndex) => {	
			if (carouselImage.src === galleryImg.querySelector('img').src && index === carouselIndex) {
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

// Carousel Handle
;[...$$('.carousel .image')].forEach((carouselImage, index) => {
	// Active Img
	carouselImage.addEventListener('click', () => {
		const activeImg = document.querySelector('.carousel .image.active');
		activeImg.classList.remove('active');
		carouselImage.classList.add('active');
		galleryImg.innerHTML = `
			<img src="${carouselImage.querySelector('img').src}" data-index = "${index + 1}" alt="">
		`;
		if (index === 0) {
			HideControl(controlPre);
			UnhideControl(controlNext);
		} else if (index === ([...$$('.carousel .image')].length - 1)) {
			HideControl(controlNext);
			UnhideControl(controlPre)
		} else {
			UnhideControl(controlNext);
			UnhideControl(controlPre);
		}
	})
})

// MoveImgToCentre
;[...$$('.carousel .image')].forEach((carouselImage) => {
	const observer = new MutationObserver((mutations) => {
		// console.log(mutations);
		if (mutations[0].target === document.querySelector('.carousel .image.active')) {
			const activeImg = document.querySelector('.carousel .image.active');
			const centreScreen =  Math.round((document.documentElement.clientWidth)/2);	
			if (activeImg) {
				carousel.style.transform = `translateX(0px)`; 
				/* 
				Phải để carousel.style.transform = `translateX(0px)`; ở đầu vì space là khoảng cách centre ảnh-active sau khi đã có 1 ảnh được centre trước đó
				=> translateX dịch chuyển ảnh bằng khoảng các space so với vị trí đã được căn chỉnh
				mà translateX là dịch chuyển ảnh bằng khoảng cách space so với vị trí ban đầu 
				VD: 
				- lúc ban đầu hay chưa centre
				Space ảnh 3 và centre: -328
				Space ảnh 4 và centre: -228
				- lúc đã centre ảnh 3
				Space ảnh 3 và centre: 0
				Space ảnh 4 và centre: 100
				--> space khác nhau --> đưa về translateX(0px) để thống nhất space ban đầu
				*/
				const activeImgCdn = activeImg.getBoundingClientRect();
				const centreImg = Math.round((activeImgCdn.left + activeImgCdn.right)/2);
				const space = centreImg - centreScreen;
				carousel.style.transform = `translateX(${-space}px)`; 
			} 
		}
	})
	observer.observe(carouselImage, { attributes : true, attributeOldValue: true, attributeFilter: ['class']})
})

// ScrollCarousel
let isScrolling = false;
carousel.addEventListener('wheel', (e) => {
	e.preventDefault();
	if (isScrolling) return;
		isScrolling = true;
		const activeImg = document.querySelector('.carousel .image.active');
		if (e.deltaY < 0 && activeImg.nextElementSibling) {
			const nextImg = activeImg.nextElementSibling;
			activeImg.classList.remove('active');
			nextImg.classList.add('active');
			galleryImg.querySelector('img').src = nextImg.dataset.imgurl;
		} else if (e.deltaY > 0 && activeImg.previousElementSibling) {
				const preImg = activeImg.previousElementSibling;
				activeImg.classList.remove('active');
				preImg.classList.add('active');
				galleryImg.querySelector('img').src = preImg.dataset.imgurl;
		}
	setTimeout(() => {
		isScrolling = false;
	},50)
})
