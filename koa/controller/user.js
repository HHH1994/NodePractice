/**
 * Created by HHH on 2018/11/8.
 */
const Router = require('koa-router');
const router = new Router({
    prefix:"/user"
});

const userImpl = require("../implement/userImp");


const getUserById = async ctx=>{
    await userImpl.getUserById(ctx);
};
const updateUser = async ctx=>{
    await  userImpl.updateUser(ctx);
};

const getUserInfo = async ctx =>{
    await userImpl.getUserInfo(ctx);
};


/* 路由部分*/
// 只有在route.get/post回调函数体内执行完前,ctx.body语句执行了,那么该次请求才算成功
router.get("/getUserById",getUserById);
router.get("/getUserInfo",getUserInfo);
router.post("/updateUser",updateUser);
module.exports = router;