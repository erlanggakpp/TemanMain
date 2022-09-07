"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Magnets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: false,
      },
      EventId: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        references: {
          model: "Events",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: false,
      },
      confirmationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      ageRequirement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      specialRequirement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      magnetDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      participant: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vacantParticipant: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Magnets");
  },
};
