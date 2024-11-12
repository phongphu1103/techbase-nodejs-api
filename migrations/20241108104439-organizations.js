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
    const { DataTypes } = Sequelize;

    await queryInterface.createTable('organizations', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, varchar: 100 },
      code: { type: DataTypes.STRING, varchar: 50, unique: true },
      parent_id: { type: DataTypes.INTEGER, defaultValue: 0, unsigned: true },
      level: { type: DataTypes.INTEGER, defaultValue: 0, smallint: true, unsigned: true },
      status: { type: DataTypes.STRING, defaultValue: 'active', enum: ['active', 'delete'] },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: null },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      updated_at: { type: DataTypes.DATE, defaultValue: null },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_at: { type: DataTypes.DATE, defaultValue: null }
    })

    await queryInterface.createTable('organization_users', {
      user_id: { type: DataTypes.INTEGER, unsigned: true },
      organization_id: { type: DataTypes.INTEGER, unsigned: true },
    })

    await queryInterface.addConstraint('organization_users', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_organization_users_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('organization_users', 'fk_organization_users_user_id')
    await queryInterface.dropTable('organization_users')

    return await queryInterface.dropTable('organizations')
  }
};
