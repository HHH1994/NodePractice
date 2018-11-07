/**
 * Created by HHH on 2018/11/2.
 */
const ErrorHandler = async (ctx,next)=>{
    try {
        await  next();
        console.log("It is right");
    }
    catch (err){
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message:err.message
        };
    }
};

exports.ErrorHandler = ErrorHandler;