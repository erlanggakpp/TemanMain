"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: "AdminId" });
      Event.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Event.hasMany(models.Magnet, { foreignKey: "EventId" });
      Event.hasMany(models.Request, { foreignKey: "EventId" });
      Event.hasMany(models.Invitation, { foreignKey: "EventId" });
    }
  }
  Event.init(
    {
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Please choose event's category`,
          },
          notEmpty: {
            msg: `Please choose event's category`,
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's name is required`,
          },
          notEmpty: {
            msg: `Event's name is required`,
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's location is required`,
          },
          notEmpty: {
            msg: `Event's location is required`,
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's description is required`,
          },
          notEmpty: {
            msg: `Event's description is required`,
          },
        },
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's date is required`,
          },
          notEmpty: {
            msg: `Event's date is required`,
          },
        },
      },
      eventHomepageLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's official homepage is required`,
          },
          notEmpty: {
            msg: `Event's official homepage is required`,
          },
        },
      },
      eventDuration: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's duration is required`,
          },
          notEmpty: {
            msg: `Event's duration is required`,
          },
        },
      },
      AdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Information of the event creator is required`,
          },
          notEmpty: {
            msg: `Information of the event creator is required`,
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's image/photo is required`,
          },
          notEmpty: {
            msg: `Event's image/photo is required`,
          },
        },
      },
      ticketPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Event's ticket price is required`,
          },
          notEmpty: {
            msg: `Event's ticket price is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
