"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Request.belongsTo(models.User, { foreignKey: "UserId" });
      Request.belongsTo(models.Event, { foreignKey: "EventId" });
      Request.belongsTo(models.Magnet, { foreignKey: "MagnetId" });
    }
  }
  Request.init(
    {
      UserId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
      MagnetId: DataTypes.INTEGER,
      requestDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Request description is required`,
          },
          notEmpty: {
            msg: `Request description is required`,
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
