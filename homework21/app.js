const express = require ('express');
const server = express();
let requestAmount = 0;
const mainRouters = require('./routes/routes');
const createError = require('http-errors');

server.set('view engine', 'ejs');
server.set('views', './views');



server.use((req, res, next) => {
    requestAmount++;
    console.log(requestAmount);
    next()
});

/* server.use(express.static('./public')); */


server.use('/', mainRouters); 

server.use((req, res, next) => {
    if (req.url === '/video/home.mp4') {
        console.log('Фу, сбоченець...')
    }
    next();    
});

server.use((req, res, next) => {
    if (req.statusCode === 500 || req.statusCode === 404 || req.statusCode === null) {
        res.render('error');
    }
    
});


server.listen(4308);