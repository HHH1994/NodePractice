/**
 * Created by HHH on 2018/11/1.
 */
var qr = require('qr-image');
var url = require('url');
var http = require('http');


http.createServer(function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader("Content-Type", "*");
    var text = url.parse(req.url, true).query.text;
    console.log(text);
    try {
        var img = qr.image(text);
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
}).listen(8888);
