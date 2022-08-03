const http = require('http');
const url = require('url')
const fs = require('fs');
const user = {
    name : 'User',
    age : 23,
    sex : 'male',
    country : 'Ukraine'
};

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)

    if (pathname === '/') {
        req.responseType = 'json';
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    }
    else if (pathname === '/aboutus') {
        res.statusCode = 200;
        res.end(`<h1>About Us</h1>`);
    }
    else if (pathname === '/contacts') {
        res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Content-Disposition": "attachment; filename=50cent.png"
          });
          fs.createReadStream('./images/photo.jpg').pipe(res);
    }
    else {
        res.statusCode = 404;
        res.end(`<h1>Page not found</h1>`);
    }

}).listen(4308)