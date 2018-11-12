/**
 * Created by HHH on 2018/11/9.
 */
const  articleMapper = require("../dal/articleMapper");
const  Result = require("../Response");

const findArticleList = ctx =>{
    let condition = ctx.request.query;
    console.log(condition);
    return articleMapper.findArticleList(condition)
        .then(res=>{
            if(res==null){
                ctx.response.body = Result.ErrResult(0,"暂无数据");
            }
            else {
                ctx.response.body = res;
            }

        });
};

/**
 *  新增文章
 * @param ctx
 * @returns {Promise.<TResult>}
 */
const addArticle  = ctx =>{
    let data = JSON.parse(ctx.request.body);
    if(data.title==""||data.title==undefined){
        return ctx.response.body = Result.ErrResult(0,"文章标题不能为空");
    }
    return articleMapper.addArticle(data)
        .then(res=>{
            if(res.dataValues.id !=undefined){
                ctx.response.body =  Result.SuccessResult(1,"新增成功");
            }
        });
};

/**
 *  修改文章
 * @param ctx
 * @returns {Promise.<TResult>}
 */
const modifyArticle = ctx =>{
    const data =  JSON.parse(ctx.request.body);
    return articleMapper.modifyArticle(data)
        .then(res=>{
            if(res[0]){
                ctx.response.body = Result.SuccessResult(1,"修改成功");
            }
            else {
                ctx.require.body = Result.ErrResult(0,"无修改");
            }
        });
};

const  deleteArticle = ctx =>{
    const data = ctx.request.query;
    return articleMapper.updateStatus(data.status,data.id)
        .then(res=>{
            if(res[0]){
                ctx.response.body = Result.SuccessResult(1,"删除成功");
            }
            else {
                ctx.response.body =  Result.ErrResult(0,"删除失败");
            }
        });
};

module.exports ={
    findArticleList,
    addArticle,
    modifyArticle,
    deleteArticle
};