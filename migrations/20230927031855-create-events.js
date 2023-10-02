"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.STRING,
      },
      venue: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.ENUM("music", "webinar", "sports"),
      },
      regularTicket: {
        type: Sequelize.INTEGER,
      },
      vipTicket: {
        type: Sequelize.INTEGER,
      },
      EventOrganizersId: {
        type: Sequelize.INTEGER,
        references: {
          model: "EventOrganizers",
          key: "id",
        },
        allowNull: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Events");
  },
};
