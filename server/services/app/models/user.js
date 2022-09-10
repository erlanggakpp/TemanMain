"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Event, { foreignKey: "AdminId" });
      User.hasMany(models.Request, { foreignKey: "UserId" });
      User.hasMany(models.Invitation, { foreignKey: "UserId" });
      User.hasMany(models.Magnet, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      profilePict: DataTypes.STRING,
      instagramAccount: DataTypes.STRING,
      twitterAccount: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
