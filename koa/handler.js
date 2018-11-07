/**
 * Created by HHH on 2018/11/2.
 */
const fs = require("fs");
const  main = async ctx=>{
    console.log("main接口,开始");
    ctx.response.status = await 200;
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream("test.html");
    console.log("main接口,结束");
};
const  about = async ctx=>{
    //ctx.response.type = "json";
    ctx.response.body = await "It is about ";
};

const cookieDemo = async ctx=>{
    ctx.cookies.set('token',"adada",{
        domain: 'localhost',  // 写cookie所在的域名
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false
    });
    console.log(ctx.cookies.get("token"));
    ctx.response.body = "view";
};




exports.main = main;
exports.about = about;
exports.cookieDemo = cookieDemo;