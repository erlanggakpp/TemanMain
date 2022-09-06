"use strict";
const { Categories } = require("../../../../db.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let categoriesSeed = [...Categories];
    categoriesSeed.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categoriesSeed, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
