'use strict';

const audit = (Sequelize) => ({
  created_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  created_at: { type: Sequelize.DATE, allowNull: false },
  updated_at: { type: Sequelize.DATE, allowNull: false },
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job_openings', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      slug: { type: Sequelize.STRING(190), allowNull: false, unique: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      department: { type: Sequelize.STRING(150), allowNull: true },
      location: { type: Sequelize.STRING(190), allowNull: true },
      employment_type: {
        type: Sequelize.ENUM('full_time', 'part_time'),
        allowNull: false,
        defaultValue: 'full_time',
      },
      summary: { type: Sequelize.TEXT, allowNull: true },
      responsibilities: { type: Sequelize.JSON, allowNull: true },
      qualifications: { type: Sequelize.JSON, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('insight_resources', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      type: { type: Sequelize.ENUM('whitepaper', 'newsletter', 'form'), allowNull: false },
      slug: { type: Sequelize.STRING(190), allowNull: false, unique: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      file_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      format: { type: Sequelize.ENUM('pdf', 'xls'), allowNull: true },
      published_date: { type: Sequelize.DATEONLY, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('regulatory_updates', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      body: { type: Sequelize.TEXT, allowNull: true },
      published_date: { type: Sequelize.DATEONLY, allowNull: true },
      tags: { type: Sequelize.JSON, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('recognitions', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      image_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      href: { type: Sequelize.STRING(1000), allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('legacy_milestones', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      period: { type: Sequelize.STRING(100), allowNull: false },
      generation: { type: Sequelize.STRING(100), allowNull: true },
      name: { type: Sequelize.STRING(190), allowNull: true },
      photo_media_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'media_files', key: 'id' },
        onDelete: 'SET NULL',
      },
      alt: { type: Sequelize.STRING(255), allowNull: true },
      body: { type: Sequelize.TEXT, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('legacy_milestones');
    await queryInterface.dropTable('recognitions');
    await queryInterface.dropTable('regulatory_updates');
    await queryInterface.dropTable('insight_resources');
    await queryInterface.dropTable('job_openings');
  },
};
