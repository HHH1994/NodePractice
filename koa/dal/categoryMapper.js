/**
 * Created by HHH on 2018/11/13.
 */
const sequelize = require("sequelize");
const Mysql = require("../config/db");
const categorySchema = "../schema/category";
const Category = Mysql.import(categorySchema);


/**
 *  查找所有类目
 * @returns {Promise.<Array.<Model>>}
 */
 function findAllCategories(){
    return Category.findAll({
        where:{
            delete_flag:"0"
        }
    });
}

/**
 *  根据用户id查询类目列表
 * @param userId
 */
function findCategoriesList(userId) {
    return Category.findAll({
       where:{
           user_id : userId,
           delete_flag:"0"
       }
    });
}

/**
 *  根据用户Id查找类目列表
 * @param userId
 * @returns {Promise.<Array.<Model>>}
 */
 function findCategoriesByUserId(userId) {
    return  Category.findAll({
        where :{
            user_id:userId,
            delete_flag:"0"
        }
    });
}

/**
 *  查找当前userId下用户的总文章数
 * @param userId
 * @returns {Promise.<void>}
 */
function getAmountArticle(userId) {
    return Category.sum("total_article",{
        where:{
            user_id:userId
        }
    });
}

function findCategoryById(id) {
    return Category.findOne({
        where:{
            id:id,
            delete_flag:0
        }
    });
}

/**
 *  类别文章总数+1
 * @param id
 * @param totalArticle
 * @param transition
 */
function modifyArticleCount(id,totalArticle,transition){
    return Category.update({
        total_article:totalArticle
    },{
        where:{
            id :id
        },
        transition:transition
    });
}
module.exports = {
    findAllCategories,
    findCategoriesByUserId,
    getAmountArticle,
    findCategoriesList,
    modifyArticleCount,
    findCategoryById
};