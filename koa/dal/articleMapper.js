/**
 * Created by HHH on 2018/11/9.
 */
const Sequelize = require("sequelize");
const Mysql = require("../config/db");
const userSchema = "../schema/article";
const cateSchema = "../schema/category";
const Article = Mysql.import(userSchema);
const Category = Mysql.import(cateSchema);
const Op = Sequelize.Op;
Article.belongsTo(Category,{foreignKey:"category_id",targetKey:"id"});


/**
 *  查找文章
 * @param condition: {
 *              pageNo: 页码
 *              pageSzie: 每页展示数量
 *              key: 关键字
 *           }
 * @returns {Promise.<*>}
 */
function findArticleList(condition){
    console.log(condition);
    const pageSize = parseInt(condition.pageSize),
        pageNo= parseInt(condition.pageNo),
        id = condition.id,
        key = condition.key,
        category_id = condition.category_id;
    let whereObj = {
        delete_flag:0,
        [Op.or]:[
            {
                title:{
                    [Op.like]: '%'+key+'%',
                }
            },
            {
                content:{
                    [Op.like]: '%'+key+'%',
                },
            }
        ]
    };
    if(category_id!=null&&category_id!='undefined'&&category_id!=''){
        whereObj.category_id = category_id;
    }
    return Article.findAll({
        include:{
            model:Category,
            attributes:["id","name"],
            where:{
                user_id :id
            }
        },
        where:whereObj,
        limit:pageSize,
        offset:(pageNo-1)*pageSize,
    });
}

/**
 *  计算文章总数
 * @param condition
 * @returns {Promise.<Number>}
 */
function findTotalAccount(condition){
    const pageSize = parseInt(condition.pageSize),
        pageNo= parseInt(condition.pageNo),
        id = condition.id,
        key = condition.key;

    return Article.sum("article.id",{
        include:{
            model:Category,
            attributes:["name"],
            where:{
                user_id :id
            }
        },
        where:{
            delete_flag:0,
            [Op.or]:[
                {
                    title:{
                        [Op.like]: '%'+key+'%',
                    }
                },
                {
                    content:{
                        [Op.like]: '%'+key+'%',
                    },
                }
            ]
        }
    });
}

/**
 *  新增文章
 * @param articleModel
 * @returns {Promise<Domain|Object>}
 */
function addArticle(articleModel,t){
    return   Article.create({
        title:articleModel.title,
        content:articleModel.content,
        category_id:articleModel.category_id,
        delete_flag:0,
        create_time:new Date(Date.now()+8*60*60*1000)
    },{
        transaction:t
    });
}

/**
 *  修改文章
 * @param articleMode
 * @returns {Promise.<*>}
 */
function modifyArticle(articleMode){
    console.log(Date.now());
    return   Article.update(
        {
            title:articleMode.title,
            content:articleMode.content,
            update_time:new Date(Date.now()+8*60*60*1000)// 纠正时区,node服务器默认为格林尼治时间
        },
        {
            where:{
                id:articleMode.id
            }
        }
    );
}

/**
 *
 * @param status 0:正常 1:删除
 * @param id 文章Id
 * @returns {Promise.<void>}
 */
function updateStatus(status,id){
    return   Article.update(
        {
            delete_flag:status
        },
        {
            where:{
                id:id
            }
        }
    );
}

/**
 *  根据文章id获取文章内容
 * @param id
 */
function findArticleById(id) {
    return Article.findOne({
        include:{
            model:Category,
            attributes:["name"]
        },
        where:{
            id:id,
            delete_flag:0
        }
    });
}

module.exports = {
    findArticleList,
    addArticle,
    modifyArticle,
    updateStatus,
    findTotalAccount,
    findArticleById
};