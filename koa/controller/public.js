/**
 * Created by HHH on 2018/11/9.
 */
const Router = require("koa-router");
const Result = require("../Response");
const koabody = require("koa-body");
const FileUtil = require("../utils/FileUtil");

const uploadFile = ctx =>{
    console.log( ctx.request.files.file);
    ctx.body = Result.SuccessResult(1,ctx.request.files.file.path);
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
            //todo:自定义图片名
            const ext = FileUtil.getUploadFileExt(file.path);
            // 自定义文件路径
            file.path = 'D:/Downloads/123.jpg';
        }
    }
}),uploadFile);

router.post("file2",koabody({
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
            //todo:自定义图片名
            // 自定义文件路径
            file.path = 'D:/Downloads/343.jpg';
        }
    }
}),uploadFile);

module.exports = router;