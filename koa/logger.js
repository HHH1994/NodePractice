/**
 * Created by HHH on 2018/11/11.
 */
const logger = require("koa-logger");
const file = require("fs");

const logMidWare = logger(function(str,args){
   /* let logMsg ="";
    if(args.length>3){
        logMsg+="========>Request";
        logMsg+= " 请求类型: "+args[1];
        logMsg+= " 接口名: "+args[2];
        logMsg+=" http状态码: "+args[3];
        logMsg+= " 请求耗费时间: "+args[4];
        logMsg+=" [----时间戳: "+ new Date().toUTCString()+"----]\r\n";
    }
    else {
        logMsg+="<========Response";
        logMsg+= " 请求类型: "+args[1];
        logMsg+= " 接口名: "+args[2];
        logMsg+=" [----时间戳: "+ new Date().toUTCString()+"----]\r\n";
    }

    // 计算日志文件行数
    let f = file.readFileSync("./log.txt").toString();
    let logLen = f.split('\r').length;
    if(logLen>500){
     // 删除前100行日志

    }
    file.appendFile("./log.txt",logMsg,function (err) {
        if(err){
            console.log("Error: 日志写入发生错误！")
        }
    });*/
    console.log("日志: "+str);
});

module.exports = logMidWare;