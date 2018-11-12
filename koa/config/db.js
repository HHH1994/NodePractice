/**
 * Created by HHH on 2018/11/8.
 */
const Sequelize = require('sequelize');
const config = {
    database:"nodepractice",
    username:"root",
    passward:"",
    otherOption:{
        host:"localhost",//链接地址,
        dialect:"mysql",
        define: {
            timestamps: false // 默认为 true
        }

    }
};
const sequelize = new Sequelize(config.database,config.username,config.passward,config.otherOption);
sequelize.authenticate()
    .then(res=>{
        console.log("Connection is success");
    })
    .catch(err=>{
        console.log("Connection is fail");
        console.log("Error is"+err);
    });

module.exports = sequelize;