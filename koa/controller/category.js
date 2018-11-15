/**
 * Created by HHH on 2018/11/13.
 */
const Router = require("koa-router");
const router = new Router({
    prefix:"/category/"
});
const categoryImp = require("../implement/categoryImp");


async function findAllCategories(ctx){
    await categoryImp.findAllCategories(ctx);
}

async function findCategoriesByUserId(ctx) {
    await categoryImp.findCategoriesByUserId(ctx);
}

router.get("categories",findAllCategories);
router.get("categoriesById",findCategoriesByUserId);
module.exports = router;