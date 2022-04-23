"use strict";
const { hash } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password: hash("123456", 10),
          role: "admin",
          image_url: "https://imgur.com/gallery/QjkTAV2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "owner@mail.com",
          password: hash("123456", 10),
          role: "owner",
          image_url: "https://imgur.com/gallery/QjkTAV2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
