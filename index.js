/**
 * Created by HHH on 2018/10/31.
 */
var http = require('./server');
var route = require("./route");
var requestHandler = require("./controll");

requestHandler["/apply"] = requestHandler.apply;
requestHandler["/upload"] = requestHandler.upload;
requestHandler["/show"] = requestHandler.show;
http.start(route,requestHandler);