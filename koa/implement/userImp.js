/**
 * Created by HHH on 2018/11/8.
 */
const userMapper = require("../dal/userMapper");

var findUser = ctx=>{
    userMapper.then(userList =>{
        // var data = [];
        // userList.forEach(item=>{
        //    data.push(item.dataValues);
        // });
        ctx.status = 200;
        ctx.response.body = userList;
    });
};

var getUserById = async ctx =>{
    var id = ctx.request.query.id;
    if(id==""||id==undefined){
        return  ctx.response.body={
            code:2,
            message:"请上传Id"
        };
    }
    await userMapper.GetUserById(id)
        .then(res=>{
            if(res==null){
                return  ctx.response.body={
                    code:0,
                    message:"查无结果"
                };
            }
            ctx.response.body = res;
        });
};

var  updateUser = async  ctx =>{
    var data =JSON.parse( ctx.request.body);
    if(data.id==""||data.id==undefined){
        return  ctx.response.body={
            code:2,
            message:"请上传Id"
        };
    }
    await userMapper.UpdateUser(data)
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