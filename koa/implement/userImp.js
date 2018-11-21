/**
 * Created by HHH on 2018/11/8.
 */
const userMapper = require("../dal/userMapper");
const categoryMapper = require("../dal/categoryMapper");
const Result = require("../Response");
const Mysql = require("../config/db");


/**
 *  根据id查询用户
 * @param ctx
 * @returns {*}
 */
const getUserById =  ctx =>{
    let id = ctx.request.query.id;
    if(id==""||id==undefined){
        return  ctx.response.body= Result.ErrResult(0,"请上传id");
    }
    return userMapper.GetUserById(id)
        .then(res=>{
            if(res==null){
                ctx.response.body= Result.ErrResult(0,"查无结果");
            }
            ctx.response.body = res;
        });
};

/**
 *  修改用户信息
 * @param ctx
 * @returns {*}
 */
const  updateUser =   ctx =>{
    let data =JSON.parse( ctx.request.body);
    if(data.id==""||data.id==undefined){
        return  ctx.response.body= Result.ErrResult(0,"请上传id");
    }
    return Mysql.transaction(t=>{
        return userMapper.UpdateUser(data,t)
            .then(res=>{
                if(res[0]==1){
                    ctx.response.body = "修改成功";
                }
                else {
                    ctx.response.body = {
                        code:1,
                        message:"无信息修改"
                    };
                }
            });
    });
};

/**
 *  获取用户信息
 * @param ctx
 * @returns {Promise.<TResult>}
 */
/*const getUserInfo =  ctx=>{
 // 查询文章总数
 return categoryMapper.getAmountArticle(ctx.request.query.id)
 .then(  totalNum=>{
 console.log("mapper1");
 return userMapper.GetUserById(ctx.request.query.id)
 .then(res=>{
 console.log("mapper2");
 res.dataValues.total_amount_article = totalNum;
 ctx.body = res;
 });
 });
 };*/
const getUserInfo = async ctx=>{
    // 查询文章总数
    console.time("p2");
    let userId = ctx.request.query.id;
    let [totalNum,userInfo,categoryList] = await Promise.all([categoryMapper.getAmountArticle(userId),
        userMapper.GetUserById(userId),
        categoryMapper.findCategoriesList(userId)]);
    console.timeEnd("p2");
    userInfo.dataValues.total_amount_article = totalNum;
    userInfo.dataValues.total_category = categoryList.length;
    ctx.body = Result.SuccessResult(1,userInfo);
};

module.exports = {
    getUserById,
    updateUser,
    getUserInfo
};