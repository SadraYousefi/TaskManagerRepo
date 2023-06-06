'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
      models.User.hasMany(Task)
      Task.belongsTo(models.Group)
      models.Group.hasMany(Task)
    }
  }
  Task.init({
    id: {
      type: DataTypes.NUMBER ,
      autoIncrement: true,
      primaryKey: true ,
    },
    title: DataTypes.STRING,
    deadLine: DataTypes.STRING,
    status: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    userID: DataTypes.NUMBER ,
    groupID: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};