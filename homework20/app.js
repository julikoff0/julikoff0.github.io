const express = require('express');
const server = express();

const { getProductList } = require('./productList.js');
const productsArr  =  getProductList();

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public'))

server.get('/', (req, res) => {
    res.render('index.ejs')
})

server.get('/products', (req, res) => {
    res.send(JSON.stringify(productsArr));
})

server.listen(4308);