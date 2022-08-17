
/* const loaderPage = document.querySelector('div.loader-page');
const mainPage = document.querySelector('main'); */

const ejs = require('ejs');

async function getListOfProducts () {
    await axios.get('/products')
    .then( (res) => {        
        ejs.render('index.ejs', {res})
    })
}
getListOfProducts()