/**
 * Created by HHH on 2018/11/2.
 */
const  Koa = require("koa");
const app = new Koa();
const cors = require('koa-cors');
const logMidWare = require('./logger');
const handle = require("./handler");
const koabody = require("koa-body");
const convert = require("koa-convert");//转换Generator函数为async函数
const midware = require("./MiddleWare");


/*1. 异常解决中间件
  2. 日志中间件
  3. 解决跨域中间件
  4. 解析Post请求请求体中间件
*/
app.use(midware.ErrorHandler)
    .use(logMidWare)
    .use(cors())
    .use(koabody());


// 路由
const router1 = require("./controller/user");// 用户模块
const router2 = require("./controller/article");// 文章模块
const router3 = require("./controller/public");// 公共模块
const router4 = require("./controller/category");// 类目模块
app.use(router1.routes())
    .use(router2.routes())
    .use(router3.routes())
    .use(router4.routes());

// 设置端口
app.listen(3000);


