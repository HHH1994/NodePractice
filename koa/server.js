/**
 * Created by HHH on 2018/11/2.
 */
const  Koa = require("koa");
const app = new Koa();
const cors = require('koa-cors');
const Router = require('koa-router');
const logger = require('koa-logger');
const handle = require("./handler");
const koabody = require("koa-body");
const convert = require("koa-convert");//转换Generator函数为async函数
const userControll = require("./controller/user");
const midware = require("./MiddleWare");
const router = new Router();

// 解决跨域
app.use(midware.ErrorHandler)
    .use(logger())
    .use(cors())
    .use(koabody());


// 路由
router.get("/main",handle.main);
router.get("/about",handle.about);
router.get("/getUser",userControll.findUser);
router.get("/getUserById",userControll.getUserById);
router.post("/updateUser",userControll.updateUser);
app.use(router.routes())
    .use(router.allowedMethods());


// 设置端口
app.listen(3000);


