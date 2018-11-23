/**
 * Created by HHH on 2018/11/9.
 */
const Router = require("koa-router");
const articleImp = require("../implement/articleImp");

/* 路由部分*/
const router = new Router({
    prefix:"/article/"
});
router.get("findArticle",articleImp.findArticleList);
router.post("addArticle",articleImp.addArticle);
router.post("modifyArticle",articleImp.modifyArticle);
router.post("deleteArticle",articleImp.deleteArticle);

module.exports = router;