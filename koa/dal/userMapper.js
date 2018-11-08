/**
 * Created by HHH on 2018/11/8.
 */
const Mysql = require("../config/db");
const userSchema = "../schema/user";
const User = Mysql.import(userSchema);


async function getUserById(id) {
    return await User.findOne({
        where: {
            id
        }
    })
};

async function add() {
    return await User.create({
        age:12
    })
};

add()
    .then(res=>{
        console.log("新增成功");
        console.log(res);
    })
    .catch(err=>{
       console.log(err);
    });