"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invitation.belongsTo(models.User, { foreignKey: "UserId" });
      Invitation.belongsTo(models.Event, { foreignKey: "EventId" });
      Invitation.belongsTo(models.Magnet, { foreignKey: "MagnetId" });
    }
  }
  Invitation.init(
    {
      UserId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
      MagnetId: DataTypes.INTEGER,
      invitationDescription: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
