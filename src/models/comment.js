'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'Profile' });
      this.belongsTo(models.Activity, { foreignKey: 'activity_id', as: 'Activity' });
    }
  }
  Comment.init({
    content:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Comment',

  });
  return Comment;
};