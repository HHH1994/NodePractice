/**
 * Created by HHH on 2018/11/8.
 */

const PageResult = ()=>{
  return {
      data:{},
      pageNo:0,
      total:0,
      isLast:true,
      isFirst:true,
  }
};

/**
 *  请求正确结果封装
 * @param res
 * @param msg
 * @returns {{msg: *, res: *}}
 * @constructor
 */
const SuccessResult = (res,msg)=>{
    return {
        msg:msg,
        res:res
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