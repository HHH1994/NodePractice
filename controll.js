/**
 * Created by HHH on 2018/11/1.
 */
var fs = require("fs"),
    formidable = require("formidable");

var apply = function(res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Hello Apply");
    res.end();
};

var upload = function(res,req){
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        console.log("parsing done");
        console.log(fields);
        fs.renameSync(files.upload.path, "/img/test.png");
        console.log("ok");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
};

// 显示文件
var show = function(res,postData){
    fs.readFile( "./img/bg.png","binary", function(error, file) {
            if (error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            } else {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.write(file, "binary");
                res.end();
            }
        })
};

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds){
        console.log("ing");
    };
}
exports.upload = upload;
exports.apply = apply;
exports.show = show;