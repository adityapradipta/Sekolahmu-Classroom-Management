"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Classes",
      [
        {
          rows: 2,
          columns: 3,
          teacher: "in",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rows: 2,
          columns: 2,
          teacher: "out",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rows: 4,
          columns: 3,
          teacher: "out",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
