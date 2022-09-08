"use strict";
const { users } = require("../../../../db.json");
const { hashPassword } = require('../helper/bcryptjs.js')
const { HTMLDateFormat } = require('../helper/customFormat.js')

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
    let userSeed = [...users];
    userSeed.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
      el.birthdate = HTMLDateFormat(el.birthdate)
    });
    await queryInterface.bulkInsert("Users", userSeed, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
