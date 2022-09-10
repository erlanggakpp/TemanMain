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
      // Invitation.belongsTo(models.User, { foreignKey: "UserId" });
      Invitation.belongsTo(models.Event, { foreignKey: "EventId" });
      Invitation.belongsTo(models.Magnet, { foreignKey: "MagnetId" });
    }
  }
  Invitation.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Invited person is required`,
          },
          notEmpty: {
            msg: `Invited person is required`,
          },
        },
      },
      EventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event ID required`,
          },
          notEmpty: {
            msg: `Event ID required`,
          },
        },
      },
      MagnetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Magnet ID required`,
          },
          notEmpty: {
            msg: `Magnet ID required`,
          },
        },
      },
      invitationDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Invitation description is required`,
          },
          notEmpty: {
            msg: `Invitation description is required`,
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
