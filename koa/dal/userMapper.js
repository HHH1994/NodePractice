/**
 * Created by HHH on 2018/11/8.
 */
const sequelize = require("sequelize");
const Mysql = require("../config/db");
const userSchema = "../schema/user";
const categorySchema = "../schema/category";
const User = Mysql.import(userSchema);
const Category = Mysql.import(categorySchema);

User.hasOne(Category,{foreignKey: 'user_id', sourceKey: 'id'});//user表关联category表


/**
 *  根据id查找用户
 * @param id
 * @returns {Promise.<*>}
 * @constructor
 */
function GetUserById(id) {
    return  User.findOne({
        where: {
            id:id
        }
    });
}

/**
 * 分页,根据条件查询用户
 * @param condition
 * @returns {Promise.<*>}
 */
function FindUserByPage(condition) {
    return  User.findAll({
        order:[
            ['age', 'DESC']
        ]
    });
}

/* 新增用户*/
function AddUser(user) {
    return  User.create({
        name:user.name,
        age:user.age,
        address:user.address,
        delete_flag:"0"
    })
}

/* 更新用户*/
function UpdateUser(user ,t) {
    return  User.update({
            name:user.name,
            age:user.age,
            address:user.address,
            delete_flag:user.delete_flag
        },
        {
            where:{
                id:user.id
            },
            transaction:t
        });
}

/* 删除用户*/
 function DelUser(user) {
    return  User.destroy({
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
    FindUserByPage
};