'use strict';

const audit = (Sequelize) => ({
  created_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  created_at: { type: Sequelize.DATE, allowNull: false },
  updated_at: { type: Sequelize.DATE, allowNull: false },
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plan_designs', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      slug: { type: Sequelize.STRING(190), allowNull: false, unique: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      category: {
        type: Sequelize.ENUM(
          'Defined contribution',
          'Defined benefit & cash balance',
          'Combination plans',
          'Owner-only',
          'Specialty'
        ),
        allowNull: false,
      },
      definition: { type: Sequelize.TEXT, allowNull: true },
      who_it_fits: { type: Sequelize.TEXT, allowNull: true },
      worked_example: { type: Sequelize.TEXT, allowNull: true },
      requirements: { type: Sequelize.TEXT, allowNull: true },
      image_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      flyer_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('plan_design_related', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      plan_design_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'plan_designs', key: 'id' },
        onDelete: 'CASCADE',
      },
      related_plan_design_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'plan_designs', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.addIndex('plan_design_related', ['plan_design_id', 'related_plan_design_id'], {
      unique: true,
      name: 'plan_design_related_unique',
    });

    await queryInterface.createTable('services', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      slug: { type: Sequelize.STRING(190), allowNull: false, unique: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      definition: { type: Sequelize.TEXT, allowNull: true },
      who_it_fits: { type: Sequelize.TEXT, allowNull: true },
      included: { type: Sequelize.TEXT, allowNull: true },
      requirements: { type: Sequelize.TEXT, allowNull: true },
      image_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      flyer_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('team_members', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(190), allowNull: false },
      role: { type: Sequelize.STRING(190), allowNull: true },
      credential: { type: Sequelize.STRING(190), allowNull: true },
      photo_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      bio: { type: Sequelize.TEXT, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('team_members');
    await queryInterface.dropTable('services');
    await queryInterface.dropTable('plan_design_related');
    await queryInterface.dropTable('plan_designs');
  },
};
