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
      "ClassSeats",
      [
        {
          seat: "1A",
          student_name: "",
          ClassId: 1,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1B",
          student_name: "",
          ClassId: 1,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1C",
          student_name: "",
          ClassId: 1,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2A",
          student_name: "",
          ClassId: 1,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2B",
          student_name: "",
          ClassId: 1,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2C",
          student_name: "",
          ClassId: 1,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1A",
          student_name: "",
          ClassId: 2,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1B",
          student_name: "",
          ClassId: 2,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2A",
          student_name: "",
          ClassId: 2,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2B",
          student_name: "",
          ClassId: 2,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1A",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1B",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "1C",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2A",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2B",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "2C",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "3A",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "3B",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "3C",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "4A",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "4B",
          student_name: "",
          ClassId: 3,
          UserId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seat: "4C",
          student_name: "",
          ClassId: 3,
          UserId: null,
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
    await queryInterface.bulkDelete("ClassSeats", null, {});
  },
};
