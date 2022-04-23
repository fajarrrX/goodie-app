"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Outlets", {
      fields: ["UserId"],
      type: "foreign key",
      name: "add-user-fk-to-outlet",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Outlets", "add-user-fk-to-outlet");
  },
};
