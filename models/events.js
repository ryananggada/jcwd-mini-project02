"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.hasMany(models.Transaction, { foreignKey: "couponId" });
      Events.belongsTo(models.EventOrganizers, {
        foreignKey: "EventOrganizersId",
      });
    }
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
      category: DataTypes.ENUM("music", "webinar", "sports"),
      regularTicket: DataTypes.INTEGER,
      vipTicket: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
