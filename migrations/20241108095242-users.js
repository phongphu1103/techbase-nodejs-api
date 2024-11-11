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

    await queryInterface.createTable('users', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, varchar: 100 },
      password: { type: DataTypes.STRING, varchar: 100 },
      email: { type: DataTypes.STRING, unique: true, varchar: 100 },
      staff_no: { type: DataTypes.STRING, varchar: 100, allowNull: true },
      birthday: { type: DataTypes.DATEONLY, allowNull: true },
      position_id: { type: DataTypes.INTEGER, unsigned: true , allowNull: true },
      status: { type: DataTypes.STRING, defaultValue: 'active', enum: ['active', 'delete'] },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: null },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      updated_at: { type: DataTypes.DATE, defaultValue: null },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_at: { type: DataTypes.DATE, defaultValue: null }
    })

    return await queryInterface.addConstraint('users', {
      fields: ['position_id'],
      type: 'foreign key',
      name: 'fk_users_position_id',
      references: {
        table: 'positions',
        field: 'id'
      },
      onDelete: 'set null',
      onDelete: 'set null',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('users', 'fk_users_position_id')

    return await queryInterface.dropTable('users')
  }
};
