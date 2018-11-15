/**
 * Created by HHH on 2018/11/8.
 */
const Router = require('koa-router');
const router = new Router({
    prefix:"/user"
});

const userImpl = require("../implement/userImp");

const  findUser = async ctx=>{
    await userImpl.findUser(ctx);
};

const getUserById = async ctx=>{
    await userImpl.getUserById(ctx);
};
const updateUser = async ctx=>{
    await  userImpl.updateUser(ctx);
};

const getUserInfo = async ctx=>{
    await userImpl.getUserInfo(ctx);
};

/* 路由部分*/
router.get("/getUser",findUser);
router.get("/getUserById",getUserById);
router.get("/getUserInfo",getUserInfo);
router.post("/updateUser",updateUser);
module.exports = router;