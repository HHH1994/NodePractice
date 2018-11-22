/**
 * Created by HHH on 2018/11/9.
 */
const Router = require("koa-router");
const Result = require("../Response");
const koabody = require("koa-body");
const FileUtil = require("../utils/FileUtil");

const uploadFile = ctx =>{
    console.log( ctx.request.files.file);
    let filePath = ctx.request.files.file.path.split("/"),
        len = filePath.length;
    ctx.body = Result.SuccessResult(1,filePath[len-1]);
};


const  router = new Router({
    prefix:"/pub/"
});

router.post("file",koabody({
    multipart:true, // 支持文件上传
    encoding:'gzip',
    formidable: {
        uploadDir: 'D:/Downloads', // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            /*
             *  name : formDate对象,文件对应的key值
             *  file : 上传上来的文件对象
             * */

            const ext = FileUtil.getUploadFileExt(file.path);
            // 自定义文件路径
            let customFileName= new Date().valueOf();
            file.path = 'D:/Downloads/'+customFileName+'.'+ext;
        }
    }
}),uploadFile);


module.exports = router;