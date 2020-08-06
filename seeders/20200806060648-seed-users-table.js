'use strict';
let { encryptPassword } = require('../helpers/bcrypt')

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
    await queryInterface.bulkInsert('Users', [
      {
        name: 'wahyu',
        email: 'wahyu@contoh.com',
        password: encryptPassword('123456'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'citra',
        email: 'citra@contoh.com',
        password: encryptPassword('123456'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mahmud',
        email: 'mahmud@contoh.com',
        password: encryptPassword('123456'),
        role: 'teacher',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'utari',
        email: 'utari@contoh.com',
        password: encryptPassword('123456'),
        role: 'teacher',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'nyoman',
        email: 'nyoman@contoh.com',
        password: encryptPassword('123456'),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'dani',
        email: 'dani@contoh.com',
        password: encryptPassword('123456'),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mark',
        email: 'mark@contoh.com',
        password: encryptPassword('123456'),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sana',
        email: 'sana@contoh.com',
        password: encryptPassword('123456'),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'gian',
        email: 'gian@contoh.com',
        password: encryptPassword('123456'),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
