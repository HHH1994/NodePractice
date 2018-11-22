/**
 * Created by HHH on 2018/11/9.
 */
const Router = require("koa-router");
const articleImp = require("../implement/articleImp");



const findArticleList = async  ctx=>{
    await articleImp.findArticleList(ctx);
};

const addArticle = async ctx =>{
    await articleImp.addArticle(ctx);
};

const modifyArticle = async ctx =>{
    await articleImp.modifyArticle(ctx);
};

const deleteArticle = async ctx=>{
  await  articleImp.deleteArticle(ctx);
};

/* 路由部分*/
const router = new Router({
    prefix:"/article/"
});
router.get("findArticle",findArticleList);
router.post("addArticle",addArticle);
router.post("modifyArticle",modifyArticle);
router.post("deleteArticle",deleteArticle);

module.exports = router;