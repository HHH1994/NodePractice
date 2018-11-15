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

module.exports = {
    findAllCategories,
    findCategoriesByUserId,
    getAmountArticle
};