'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('content_blocks', 'secondary_link_label', {
      type: Sequelize.STRING(190),
      allowNull: true,
    });
    await queryInterface.addColumn('content_blocks', 'secondary_link_href', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('content_blocks', 'secondary_link_label');
    await queryInterface.removeColumn('content_blocks', 'secondary_link_href');
  },
};
