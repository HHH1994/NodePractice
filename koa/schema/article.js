/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_flag: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: '0'
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    view_count: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    field2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    field3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'article'
  });
};
