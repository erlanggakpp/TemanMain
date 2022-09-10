"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Event, { foreignKey: "CategoryId" });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Category's name is required`,
          },
          notEmpty: {
            msg: `Category's name is required`,
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Category's image is required`,
          },
          notEmpty: {
            msg: `Category's image is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
