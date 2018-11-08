/**
 * Created by HHH on 2018/11/2.
 */
const  Koa = require("koa");
const app = new Koa();
var cors = require('koa-cors');
var route = require('koa-route');
var logger = require('koa-logger');
var handle = require("./handler");
var midware = require("./MiddleWare");
// 解决跨域
app.use(midware.ErrorHandler)
    .use(logger())
    .use(cors());

// 路由
app.use(route.get("/main",handle.main));
app.use(route.get("/about",handle.about));
app.use(route.get("/cookieDemo",handle.cookieDemo));

// 设置端口
app.listen(3000);


