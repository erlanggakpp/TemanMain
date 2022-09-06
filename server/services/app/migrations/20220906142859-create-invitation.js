"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invitations", {
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
        references: {
          model: "Events",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: false,
      },
      MagnetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Magnets",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: false,
      },
      invitationDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Invitations");
  },
};
