const loaderPage = document.querySelector('div.loader-page');
const mainPage = document.querySelector('main');

let button = document.createElement('button');
button.innerHTML = 'Get full catalog'
button.classList.add('get-all-product-btn');
mainPage.appendChild(button);

button.addEventListener('click', async () => {
    loaderPage.className = 'loader-page active';    

    let { data } = await axios.get('/products')    

    button.remove();
    let productList = document.createElement('div');
    productList.classList.add('product-list');
    mainPage.appendChild(productList);

    data.forEach( (item, index) => {
        let product = document.createElement('div');
        product.classList.add('product');
        product.id = index;
        productList.appendChild(product)
        let img = document.createElement('img');
        img.src = item.img;
        product.appendChild(img);
        let name = document.createElement('h1');
        name.innerHTML = item.name;
        product.appendChild(name);        
        let category = document.createElement('p');
        category.innerHTML = item.category;
        product.appendChild(category);
        let price = document.createElement('h2');
        price.innerHTML = item.category;
        product.appendChild(price);

        loaderPage.className = 'loader-page hidden';
        setTimeout(() => {
            loaderPage.remove();
        }, 500)
    })
})
