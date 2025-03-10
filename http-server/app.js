const fs = require('fs');
const http = require('http');
const path = require('path');
const PORT = 8110;
// localhost:8110

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
};

function staticFile (res, filePath, ext) {
    res.setHeader("Content-Type", mimeTypes[ext]);
    fs.readFile('./pages'+filePath, (error, data) => {
        if (error) {
            res.statusCode = 404;
            res.end();
        }
        res.end(data);
    });
}

http.createServer(function(req, res){
    const url = req.url;
    console.log(url);

    switch (url){
        case '/':
            console.log('main page');
            staticFile(res, '/index.html', '.html');
            res.end();
            break;
        default:
            staticFile(res, '/error.html', '.html');
            const extname = String(path.extname(url)).toLocaleLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, url, extname)
            }
            else {
                res.statusCode = 404;
                res.end();
            }
    }
    res.end();
}).listen(PORT);