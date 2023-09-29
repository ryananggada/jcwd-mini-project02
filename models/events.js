"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {}
  }
  Events.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      venue: DataTypes.STRING,
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
