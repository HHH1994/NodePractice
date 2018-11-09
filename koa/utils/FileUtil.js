/**
 * Created by HHH on 2018/11/9.
 */

/**
 *  获取文件后缀名
 * @param name
 * @returns {*}
 */
function getUploadFileExt(name) {
    let ext = name.split('.');
    return ext[ext.length - 1];
}

module.exports = {
    getUploadFileExt
}