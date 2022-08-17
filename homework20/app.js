const express = require('express');
const server = express();

const { getProductList } = require('./productList.js');
const productsArr  =  getProductList();

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public'))

server.get('/', (req, res) => {
    res.sendFile((__dirname + '/public/home.html'))
})

server.get('/products', (req, res) => {
    req.statusCode(200);
    res.end(JSON.stringify(productsArr));
})

server.listen(4308);