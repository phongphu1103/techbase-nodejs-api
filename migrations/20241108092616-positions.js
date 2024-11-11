'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { DataTypes } = Sequelize

    return await queryInterface.createTable('positions', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, varchar: 50 },
      code: { type: DataTypes.STRING, varchar: 50 },
      status: { type: DataTypes.STRING, defaultValue: 'active', enum: ['active', 'delete'] },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: null },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      updated_at: { type: DataTypes.DATE, defaultValue: null },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_at: { type: DataTypes.DATE, defaultValue: null }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('positions')
  }
};
