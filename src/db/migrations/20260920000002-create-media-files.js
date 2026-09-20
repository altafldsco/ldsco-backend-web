'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('media_files', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      file_name: { type: Sequelize.STRING(255), allowNull: false },
      file_path: { type: Sequelize.STRING(500), allowNull: true },
      url: { type: Sequelize.STRING(1000), allowNull: false },
      mime_type: { type: Sequelize.STRING(150), allowNull: true },
      file_type: {
        type: Sequelize.ENUM('image', 'video', 'pdf', 'doc', 'other'),
        allowNull: false,
        defaultValue: 'other',
      },
      size_bytes: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      alt_text: { type: Sequelize.STRING(255), allowNull: true },
      uploaded_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      created_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('media_files');
  },
};
