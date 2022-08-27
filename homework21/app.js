const express = require ('express');
const server = express();
let requestAmount = 0;
const mainRouters = require('./routes/routes');
const createError = require('http-errors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

server.set('view engine', 'ejs');
server.set('views', './views');



server.use((req, res, next) => {
    requestAmount++;
    console.log(requestAmount);
    next()
});

server.use(express.static('./public'));

server.post('/photo', upload.single('photo'), function (req, res, next) {
    if (req.file) {
        console.log(req.file);
        res.send("Success").status(200);
        next()
    }
    else {
        res.status(403)
        next(new Error('test 12345'));        
    }
});

server.use('/', mainRouters); 

server.use((req, res, next) => {
    if (req.url === '/video/home.mp4') {
        console.log('Фу, сбоченець...')
    }
    next();    
});

server.use((err, req, res, next) => {
    if (err) { 
    return res.status(res.statusCode || 500).render('error', 
    {
        error : err,
        status : res.statusCode
    }); 
  }
  next() 
});



server.listen(4308);