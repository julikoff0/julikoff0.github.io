const http = require('http');
const url = require('url')
const fs = require('fs');
const mime = require('mime-types')

const user = {
    name : 'User',
    age : 23,
    sex : 'male',
    country : 'Ukraine'
};

let filePathname = './files/text.txt';

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
        let fileType = mime.lookup(filePathname);
        console.log();
        if (fileType === 'image/jpeg' || fileType === 'video/mp4') {
            res.writeHead(200, {
                "Content-Type": fileType,
                "Content-Disposition": "inline",
            });
            fs.createReadStream(filePathname).pipe(res);
        }
        else {
            res.writeHead(200, {
                "Content-Type": fileType,
                "Content-Disposition": `attachment; filename=Ukraine.${mime.extension(fileType)}`,
            });
            fs.createReadStream(filePathname).pipe(res);
        }
    }
    else {
        res.statusCode = 404;
        res.end(`<h1>Page not found</h1>`);
    }

}).listen(4308)