'use strict';

const audit = (Sequelize) => ({
  created_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  updated_by: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
  created_at: { type: Sequelize.DATE, allowNull: false },
  updated_at: { type: Sequelize.DATE, allowNull: false },
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('faqs', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      page_key: { type: Sequelize.STRING(120), allowNull: false },
      question: { type: Sequelize.STRING(500), allowNull: false },
      answer: { type: Sequelize.TEXT, allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('career_benefits', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      text: { type: Sequelize.STRING(500), allowNull: false },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });

    await queryInterface.createTable('international_offices', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      country: { type: Sequelize.STRING(150), allowNull: false },
      detail: { type: Sequelize.STRING(500), allowNull: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      ...audit(Sequelize),
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('international_offices');
    await queryInterface.dropTable('career_benefits');
    await queryInterface.dropTable('faqs');
  },
};
