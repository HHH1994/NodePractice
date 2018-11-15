/**
 * Created by HHH on 2018/10/31.
 */
// 服务器模块
var http = require("http");
var url = require("url");



var start = function(route,handle){
    function onRequest(req,res) {
        console.log("url=="+req.url);
        var pathName = url.parse(req.url).pathname;
        var postData = "";
        // 解决跨域
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.setHeader("X-Powered-By", ' 3.2.1');
        res.setHeader("Content-Type", "*");


        if(req.url =="/upload"){
            console.log("上传图片");
            route.route(handle,pathName,res,req);
        }
        else {
            req.setEncoding("utf8");
            req.addListener("data", function(postDataChunk) {
                postData += postDataChunk;
                console.log("Received POST data chunk '"+
                    postDataChunk + "'.");
            });
            req.addListener("end", function() {
                route.route(handle,pathName,res,postData);
            });

        }


    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
};
exports.start = start;