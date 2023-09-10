'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Contracts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contract_number: {
        type: Sequelize.STRING,
      },
      contract_name: {
        type: Sequelize.STRING(800),
      },
      sign_date: {
        type: Sequelize.DATE,
      },
      contract_value: {
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contracts');
  }
};