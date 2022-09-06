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
      CategoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.TEXT,
      eventDate: DataTypes.DATE,
      eventHomepageLink: DataTypes.STRING,
      eventDuration: DataTypes.STRING,
      AdminId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      ticketPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
