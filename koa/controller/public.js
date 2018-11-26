/**
 * Created by HHH on 2018/11/9.
 */
const Router = require("koa-router");
const Result = require("../Response");
const koabody = require("koa-body");
const FileUtil = require("../utils/FileUtil");
const DirPath = "D:/Downloads/BlogPic/";
const fs = require("fs");
const formidable = require("formidable");

/**
 *  单个文件上传
 * @param ctx
 * @returns {Promise.<void>}
 */
const uploadFile = async ctx =>{
    let filePath = ctx.request.files.file.path.split("/"),
        len = filePath.length;
    ctx.body = Result.SuccessResult(1,filePath[len-1]);
};

/**
 *  多个文件上传
 * @param ctx
 * @returns {Promise.<void>}
 */
const uploadFiles = async ctx=>{
    console.log( ctx.request.files);
    let fileList = ctx.request.files;
    res = [];
    for(let key in fileList){
        let path = fileList[key].path.split("/");
        res.push({
            size:fileList[key].size,
            name:fileList[key].name,
            path:path[path.length-1],
        })
    }
    ctx.body = Result.SuccessResult(1,res);

};


const  router = new Router({
    prefix:"/pub/"
});

/* fs&formidable模块上传图片--单个文件 */
router.post("file", async ctx =>{
    let curPath ,tempPath;
    let form = new formidable.IncomingForm();
    form.maxFileSize = 2 * 1024 * 1024; // 文件最大值
    form.keepExtensions = true; // 路径是否显示文件扩展名
    await new Promise(resolve =>{
        //  上传过程监听
        form.on('progress', function(bytesReceived, bytesExpected) {});
        // 文件上传处理
        form.parse(ctx.req,function (err,fields,files) {
            tempPath = form.openedFiles[0].path; // 获取文件的虚拟地址
            console.log(tempPath);
            // 发生错误直接返回
            if(form.error!=null) {
                fs.unlinkSync(tempPath);
                ctx.body = Result.ErrResult(0,form.error.toString());
                return resolve();
            }
            // 判断多个文件，返回
            if(form.openedFiles.length>1){
                ctx.body = Result.ErrResult(0,"请上传单个文件");
                form.openedFiles.forEach(item=>{
                    console.log(item.path);
                    fs.unlinkSync(item.path);
                });
                return resolve();
            }
            /* 方法一*/
            let readStream=fs.createReadStream(tempPath);
            // 生成新的文件名
            let fileName = new Date().valueOf(),
                fileExt = FileUtil.getUploadFileExt(tempPath);
            if(fileExt==undefined||fileExt==""){
                fs.unlinkSync(tempPath);// 异步删除虚拟文件
                ctx.body = Result.ErrResult(0,"文件类型有误");
                return resolve("抛出异常");
            }
            curPath = DirPath+fileName+"."+fileExt;
            let writeStream=fs.createWriteStream(curPath);
            readStream.pipe(writeStream);
            // 文件写入完成监听
            readStream.on('end',function(){
                fs.unlinkSync(tempPath);// 异步删除虚拟文件
                let filePath = curPath.split("/"),
                    len = filePath.length;
                ctx.body = Result.SuccessResult(1,{path:filePath[len-1]});
                resolve("完成");
            });
        });
    });
});

/**
 *  删除文件
 */
router.post("deleFile",async ctx=>{
    let data = JSON.parse(ctx.request.body);
    let fileName = DirPath+data.filePath;
    try{
        await fs.unlinkSync(url);
        ctx.body = Result.SuccessResult(1,"删除文件成功");
    }
    catch (e){
        ctx.body = Result.ErrResult(0,"文件不存在或文件名有错");
    }
});

/*router.post("file",koabody({
 multipart:true, // 支持文件上传
 encoding:'gzip',
 formidable: {
 uploadDir: 'D:/Downloads', // 设置文件上传目录
 keepExtensions: true,    // 保持文件的后缀
 maxFileSize : 2 * 1024 * 1024, // 文件上传大小
 onFileBegin: (name, file) => { // 文件上传前的设置
 /!*
 *  name : formDate对象,文件对应的key值
 *  file : 上传上来的文件对象
 * *!/
 const ext = FileUtil.getUploadFileExt(file.path);
 try{
 throw new Error("mistake");
 }
 catch (e){
 console.log(e);
 }
 // 自定义文件路径
 let customFileName= new Date().valueOf();
 file.path = 'D:/Downloads/BlogPic/'+customFileName+'.'+ext;
 }
 }
 }),uploadFile);*/

router.post("files",koabody({
    multipart:true, // 支持多个文件上传
    encoding:'gzip',
    formidable: {
        uploadDir: 'D:/Downloads', // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFileSize : 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            /*
             *  name : formDate对象,文件对应的key值
             *  file : 上传上来的文件对象
             * */
            const ext = FileUtil.getUploadFileExt(file.path);

            // 自定义文件路径
            let customFileName= new Date().valueOf();
            file.path = 'D:/Downloads/BlogPic/'+customFileName+'.'+ext;
        }
    }
}),uploadFiles);

module.exports = router;