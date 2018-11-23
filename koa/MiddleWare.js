/**
 * Created by HHH on 2018/11/2.
 */
const ErrorHandler = async (ctx,next)=>{
    try {
        await  next();
    }
    catch (err){
        console.log(`错:${err}`);
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            error:{
                code:ctx.response.status,
                message:err.message
            }
        };
    }
};

exports.ErrorHandler = ErrorHandler;