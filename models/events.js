"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsTo(models.EventOrganizers, {
        foreignKey: "eventOrganizerId",
      });
    }
  }
  Events.init(
    {
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
      Date: DataTypes.STRING,
      Time: DataTypes.STRING,
      Venue: DataTypes.STRING,
      city: DataTypes.STRING,
      poster: DataTypes.STRING,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
