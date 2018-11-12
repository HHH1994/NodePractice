/**
 * Created by HHH on 2018/11/9.
 */
const sequelize = require("sequelize");
const Mysql = require("../config/db");
const userSchema = "../schema/article";
const Article = Mysql.import(userSchema);


/**
 *  查找文章
 * @param condition
 * @returns {Promise.<*>}
 */
async function findArticle(condition){
    return await  Article.findOne({
        where :{
            id:1
        }
    });
}

/**
 *  新增文章
 * @param articleModel
 * @returns {Promise<Domain|Object>}
 */
async function addArticle(articleModel){
    return await  Article.create({
        title:articleModel.title,
        content:articleModel.content,
        delete_flag:0,
        create_time:new Date()
    });
}

module.exports = {
    findArticle,
    addArticle
};