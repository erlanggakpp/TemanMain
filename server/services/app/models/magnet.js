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
      Magnet.belongsTo(models.Event, { foreignKey: "EventId" });
      Magnet.hasMany(models.Invitation, { foreignKey: "MagnetId" });
      Magnet.hasMany(models.Request, { foreignKey: "MagnetId" });
    }
  }
  Magnet.init(
    {
      UserId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
      confirmationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Confirmation date is required`,
          },
          notEmpty: {
            msg: `Confirmation date is required`,
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Magnet status is required`,
          },
          notEmpty: {
            msg: `Magnet status is required`,
          },
        },
      },
      ageRequirement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Age requirement is required`,
          },
          notEmpty: {
            msg: `Age requirement is required`,
          },
        },
      },
      specialRequirement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Special requirement is required`,
          },
          notEmpty: {
            msg: `Special requirement is required`,
          },
        },
      },
      magnetDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Magnet description is required`,
          },
          notEmpty: {
            msg: `Magnet description is required`,
          },
        },
      },
      participant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Participant number is required`,
          },
          notEmpty: {
            msg: `Participant number is required`,
          },
        },
      },
      vacantParticipant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Number of vacant participant is required`,
          },
          notEmpty: {
            msg: `Number of vacant participant is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Magnet",
    }
  );
  return Magnet;
};
