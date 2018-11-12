/**
 * Created by HHH on 2018/11/9.
 */
const Router = require("koa-router");
const articleImp = require("../implement/articleImp");



const findArticle = async  ctx=>{
    await articleImp.findArticle(ctx);
};

const addArticle = async ctx =>{
    await articleImp.addArticle(ctx);
};



/* 路由部分*/
const router = new Router({
    prefix:"/article/"
});
router.get("findArticle",findArticle);
router.post("addArticle",addArticle);

module.exports = router;