/**
 * Created by HHH on 2018/11/8.
 */
const userMapper = require("../dal/userMapper");
const Result = require("../Response");

const findUser =  ctx=>{
    let condition = ctx.request.query;
    return userMapper.findUserByPage(condition).then(userList =>{
        ctx.response.body = userList;
    });
};

/**
 *  根据id查询用户
 * @param ctx
 * @returns {*}
 */
const getUserById =  ctx =>{
    let id = ctx.request.query.id;
    if(id==""||id==undefined){
        return  ctx.response.body= Result.ErrResult(0,"请上传id");
    }
    return userMapper.GetUserById(id)
        .then(res=>{
            if(res==null){
                return  ctx.response.body= Result.ErrResult(0,"查无结果");
            }
            ctx.response.body = res;
        });
};

/**
 *  修改用户信息
 * @param ctx
 * @returns {*}
 */
const  updateUser =   ctx =>{
    console.log(typeof ctx.request.body);
    let data =JSON.parse( ctx.request.body);
    if(data.id==""||data.id==undefined){
        return  ctx.response.body= Result.ErrResult(0,"请上传id");
    }
    return userMapper.UpdateUser(data)
        .then(res=>{
            if(res[0]==1){
                ctx.response.body = "修改成功";
            }
            else {
                ctx.response.body = {
                    code:1,
                    message:"无信息修改"
                };
            }
        })
};



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
    findUser,
    getUserById,
    updateUser
};