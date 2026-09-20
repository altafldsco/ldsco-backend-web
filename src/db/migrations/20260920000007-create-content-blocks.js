'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('content_blocks', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      page_key: { type: Sequelize.STRING(120), allowNull: false },
      section_key: { type: Sequelize.STRING(120), allowNull: false },
      eyebrow: { type: Sequelize.STRING(255), allowNull: true },
      heading: { type: Sequelize.STRING(500), allowNull: true },
      subheading: { type: Sequelize.STRING(500), allowNull: true },
      body: { type: Sequelize.TEXT, allowNull: true },
      image_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      link_label: { type: Sequelize.STRING(190), allowNull: true },
      link_href: { type: Sequelize.STRING(1000), allowNull: true },
      extra: { type: Sequelize.JSON, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('content_blocks', ['page_key', 'section_key']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('content_blocks');
  },
};
