'use strict';

const audit = (Sequelize) => ({
  created_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  created_at: { type: Sequelize.DATE, allowNull: false },
  updated_at: { type: Sequelize.DATE, allowNull: false },
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('site_settings', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      company_name: { type: Sequelize.STRING(255), allowNull: true },
      legal_name: { type: Sequelize.STRING(255), allowNull: true },
      founded_year: { type: Sequelize.INTEGER, allowNull: true },
      email: { type: Sequelize.STRING(190), allowNull: true },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      telefax: { type: Sequelize.STRING(50), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      headquarters_label: { type: Sequelize.STRING(255), allowNull: true },
      headquarters_address: { type: Sequelize.JSON, allowNull: true },
      headquarters_phone: { type: Sequelize.STRING(50), allowNull: true },
      headquarters_map_href: { type: Sequelize.STRING(1000), allowNull: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('offices', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      region: { type: Sequelize.STRING(150), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('portals', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      label: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      href: { type: Sequelize.STRING(1000), allowNull: false },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('social_links', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      platform: {
        type: Sequelize.ENUM('facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'other'),
        allowNull: false,
      },
      href: { type: Sequelize.STRING(1000), allowNull: false },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('nav_items', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      parent_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'nav_items', key: 'id' },
        onDelete: 'CASCADE',
      },
      label: { type: Sequelize.STRING(150), allowNull: false },
      href: { type: Sequelize.STRING(500), allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      ...audit(Sequelize),
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('nav_items');
    await queryInterface.dropTable('social_links');
    await queryInterface.dropTable('portals');
    await queryInterface.dropTable('offices');
    await queryInterface.dropTable('site_settings');
  },
};
