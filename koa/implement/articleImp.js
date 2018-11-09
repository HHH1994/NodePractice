/**
 * Created by HHH on 2018/11/9.
 */
const  articleMapper = require("../dal/articleMapper");
const  Result = require("../Response");

const findArticle = ctx =>{
    return articleMapper.findArticle()
        .then(res=>{
            ctx.response.body = res;
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



module.exports ={
    findArticle,
    addArticle
};