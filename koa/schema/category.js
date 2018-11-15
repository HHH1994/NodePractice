/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('category', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        delete_flag: {
            type: DataTypes.CHAR(1),
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        total_article: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        filed3: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        update_time: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'category'
    });
};
