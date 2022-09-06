"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Magnet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Magnet.init(
    {
      UserId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
      confirmationDate: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      ageRequirement: DataTypes.STRING,
      specialRequirement: DataTypes.STRING,
      magnetDescription: DataTypes.TEXT,
      participant: DataTypes.INTEGER,
      vacantParticipant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Magnet",
    }
  );
  return Magnet;
};
