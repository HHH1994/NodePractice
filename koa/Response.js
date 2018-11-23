/**
 * Created by HHH on 2018/11/8.
 */

const PageResult = (data,total,isLast,isFirst,pageNo,pageSize)=>{
  return {
      data:data,
      pageNo:pageNo,
      pageSize:pageSize,
      total:total,
      isLast:isLast,
      isFirst:isFirst,
  }
};

/**
 *  请求正确结果封装
 * @param res
 * @param data
 * @returns {{data: *, res: *}}
 * @constructor
 */
const SuccessResult = (res,data)=>{
    return {
        data:data,
        result:res
    }
};

/**
 *  错误结果封装
 * @param code 错误码
 * @param msg 错误信息
 * @returns {{code: *, message: *}}
 * @constructor
 */
const ErrResult = (code,msg)=>{
  return {
      error: {
          code: code,
          message: msg
      }
  };
};

module.exports = {
    ErrResult,
    SuccessResult,
    PageResult
};