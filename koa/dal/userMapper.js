/**
 * Created by HHH on 2018/11/8.
 */
const sequelize = require("sequelize");
const Mysql = require("../config/db");
const userSchema = "../schema/user";
const User = Mysql.import(userSchema);

/* 根据id查找用户*/
async function GetUserById(id) {
    return await User.findOne({
        where: {
            id:id
        }
    })
}

/*根据条件查找用户*/
async function findUser(condition) {
    return await User.findAll({
        order:[
            ['age', 'DESC']
        ]
    });
};

/* 新增用户*/
async function AddUser(user) {
    return await User.create({
        name:user.name,
        age:user.age,
        address:user.address
    })
};

/* 更新用户*/
async function UpdateUser(user) {
    return await User.update({
            name:user.name,
            age:user.age,
            address:user.address,
        },
        {
            where:{
                id:user.id
            }
        });
};

/* 删除用户*/
async function DelUser(user) {
    return await User.destroy({
        where:{
            id :user.id
        }
    });
}


module.exports = {
    GetUserById,
    AddUser,
    UpdateUser,
    DelUser,
    findUser
};