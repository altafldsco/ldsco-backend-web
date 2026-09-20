'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contact_submissions', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(190), allowNull: false },
      company: { type: Sequelize.STRING(190), allowNull: true },
      email: { type: Sequelize.STRING(190), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      message: { type: Sequelize.TEXT, allowNull: false },
      status: {
        type: Sequelize.ENUM('new', 'read', 'archived'),
        allowNull: false,
        defaultValue: 'new',
      },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('contact_submissions');
  },
};
