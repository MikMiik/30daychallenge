const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const products = $('.products');
const searchInput = $('.input')

async function fetchData() {
    try {
        const resProducts = await fetch('https://fakestoreapi.com/products');
        const productsData = await resProducts.json();
        return productsData;
    }
    catch {
        console.log('Error')
    }
}

fetchData().then((productsData) => {
    let html = '';
    productsData.forEach((productData) => {
        console.log(productData.id)
        html += `
            <div class="product" id="product-${productData.id}">
                <div class="product-img">
                    <img src="${productData.image}" alt="">
                </div>
                <div class="product-content">
                    <h4 class="product-title one-line">${productData.title}</h4>
                    <div class="product-price">$${productData.price}</div>
                </div>
            </div>
        `
    })
    products.innerHTML = html;
})

function renderProduct(searchInput) {
    const input = searchInput.value.trim().toLowerCase();
    if (input == '') return;
    fetchData().then((productsData) => {
        productsData.forEach((productData) => {
            const productText = (productData.title + productData.price).toLowerCase();
            if (productText.includes(input)) {
                document.querySelector(`#product-${productData.id}`).classList.remove('hide')
            } else {
                document.querySelector(`#product-${productData.id}`).classList.add('hide')
            }
        })
    })
}

searchInput.addEventListener('input',() => {
    renderProduct(searchInput)
})
