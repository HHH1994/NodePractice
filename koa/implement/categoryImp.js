/**
 * Created by HHH on 2018/11/13.
 */
const categoryMapper = require("../dal/categoryMapper");
const Result = require("../Response");

const findAllCategories = ctx =>{
  return   categoryMapper.findAllCategories()
      .then(res=>{
          ctx.response.body = Result.PageResult(res,res.length,true,true,1,0);
      })
};

const findCategoriesByUserId = ctx =>{
    let userId = ctx.request.query.id;
    return   categoryMapper.findCategoriesByUserId(userId)
        .then(res=>{
            ctx.response.body = Result.PageResult(res,res.length,true,true,1,0);
        })
};

module.exports = {
    findAllCategories,
    findCategoriesByUserId
};