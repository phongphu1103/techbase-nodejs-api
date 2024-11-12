'use strict';

const { level } = require('winston');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('organizations', [
      {
        name: 'Director',
        code: 'DIR',
        parent_id: 0,
        level: 1,
      },
      {
        name: 'Accounting',
        code: 'ACC',
        parent_id: 1,
        level: 2,
      },
      {
        name: 'IT',
        code: 'IT',
        parent_id: 1,
        level: 2,
      },
      {
        name: 'HR',
        code: 'HR',
        parent_id: 1,
        level: 2,
      }
    ], {
      ignoreDuplicates: true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('organizations', null, {})
  }
};
