/**
 * Created by HHH on 2018/11/8.
 */
const userImpl = require("../implement/userImp");

const  findUser = async ctx=>{
    await userImpl.findUser(ctx);
};

const getUserById = async ctx=>{
    await userImpl.getUserById(ctx);
};
const updateUser = async ctx=>{
    await  userImpl.updateUser(ctx);
};

module.exports = {
    findUser,
    getUserById,
    updateUser
};