/**
 * Created by HHH on 2018/11/9.
 */
const  articleMapper = require("../dal/articleMapper");
const categoryMapper = require("../dal/categoryMapper");
const  Result = require("../Response");
const Mysql = require("../config/db");

const findArticleList = async ctx =>{
    let condition = ctx.request.query;
    if(condition.id==""||condition.id==undefined){
        return ctx.body = Result.ErrResult(0,"请上传userid");
    }
    // 计算总数
    let total = await articleMapper.findTotalAccount(condition);
    let isFirst = condition.pageNo == "1" ? true:false,
        isLast = total <= Number(condition.pageNo)*Number(condition.pageSize) ?true:false;
    return articleMapper.findArticleList(condition)
        .then(res=>{
            if(res==null){
                ctx.response.body = Result.ErrResult(0,"暂无数据");
            }
            else {
                // 处理时间格式
                ctx.response.body = Result.PageResult(res,total,isLast,isFirst,condition.pageNo,condition.pageSize);
            }

        });
};

/**
 *  新增文章
 * @param ctx
 * @returns {Promise.<TResult>}
 */
const addArticle  = async ctx =>{
    let data = ctx.request.body;
    if(data.title==""||data.title==undefined){
        return ctx.response.body = Result.ErrResult(0,"文章标题不能为空");
    }
    else if(data.category_id==""||data.category_id==undefined){
        return ctx.response.body = Result.ErrResult(0,"请选择文章分类");
    }
    return Mysql.transaction(t=>{
        return articleMapper.addArticle(data,t)
            .then(async res=>{
                let curSum = await categoryMapper.findCategoryById(res.dataValues.category_id);
                let res2 = await categoryMapper.modifyArticleCount(res.dataValues.category_id,(curSum.total_article+1),t);
                if(!res2[0]){
                    return ctx.response.body =  Result.SuccessResult(1,"新增文章失败");
                }
                if(res.dataValues.id !=undefined){
                    ctx.response.body =  Result.SuccessResult(1,"新增文章成功");
                }
                else {
                    ctx.response.body = Result.ErrResult(0,"增加文章失败");
                }
            });
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

const findArticleListByUserId = async ctx =>{
    let query = ctx.request.query;
    let res = await articleMapper.findArticleListByUserId(query.id);
    res.then(r=>{
        console.log(r);
        ctx.body = r;
    });
};

const findArticleById = async ctx =>{
    let id = ctx.request.query.id;
    if(id==""||id==undefined){
        return ctx.body = Result.ErrResult(0,"查询参数不能为空");
    }
    return Mysql.transaction(async t=>{
        return await articleMapper.findArticleById(id)
            .then(async res=>{
                let data = res.dataValues;
                let res2 = await articleMapper.addViewCount(data.id,data.view_count,t);
                if(res2[0]){
                    res.dataValues.view_count += 1;
                    ctx.body=Result.SuccessResult(1,res);
                }

            });
    });
};
module.exports ={
    findArticleList,
    addArticle,
    modifyArticle,
    deleteArticle,
    findArticleListByUserId,
    findArticleById
};