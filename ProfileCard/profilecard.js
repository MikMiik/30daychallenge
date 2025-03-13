champions = [{
  name: 'Irelia',
  role: 'Top lane',
  img: '/irelia.jpg'
}, 
{
  name: 'Hwei',
  role: 'Mid lane',
  img: '/hwei.jpg'
}, 
{
  name: 'Zed',
  role: 'Mid lane',
  img: '/zed.jpg'
},
]

let html ='';
champions.forEach((champion) => {
  html += `
    <div class="card">
      <div class="card__img">
        <img src="${champion.img}" alt="">
      </div>
      <span class="card__name">${champion.name}</span>
      <div class="card__content">
        <h2>${champion.name}</h2>
        <p>${champion.role}</p>
      </div>
      <div class="card__social">
        <a href="https://www.facebook.com/">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.youtube.com/">
          <i class="fa-brands fa-youtube"></i>
        </a>
        <a href="https://www.tiktok.com/">
          <i class="fa-brands fa-tiktok"></i>
        </a>
        <a href="https://github.com/">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
      <div class="card__contact">
        <button class="card__contact--button"> Contact me</button>
      </div>
    </div>
  `;
})

document.querySelector('body')
  .innerHTML = html;

const cardImgs = document.querySelectorAll('.card__img')

cardImgs.forEach((cardImg) => {
  const cardName = cardImg.parentElement.querySelector('.card__name');
  cardImg.addEventListener("mouseover", () => {
    cardName.classList.toggle('card__name--active')
  })
  cardImg.addEventListener("mouseout", () => {
    cardName.classList.toggle('card__name--active')
  })
})


