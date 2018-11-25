/**
 * Created by HHH on 2018/11/9.
 */

/**
 *  根据文件路径获取文件后缀名
 * @param name
 * @returns {*}
 */
function getUploadFileExt(name) {
    let ext = name.split('.');
    if(ext.length==1){
        return undefined;
    }
    return ext[ext.length - 1];
}

/**
 *  根据文件类型获取后缀名
 * @param type
 */
function getFileExtByType(type) {
    if(type.indexOf("/")==-1){
        return ;
    }
    let ext = type.split("/");
    return ext[ext.length-1];
}

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data;
                console.log(postdata);
            });

            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata );
                resolve( parseData )
            })
        } catch ( err ) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for ( let [ index, queryStr ] of queryStrList.entries() ) {
        let itemList = queryStr.split('=');
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1]);
    }
    return queryData
}

module.exports = {
    getUploadFileExt,
    getFileExtByType
};