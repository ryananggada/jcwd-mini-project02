"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventOrganizers extends Model {
    static associate(models) {
      EventOrganizers.hasMany(models.Events, {
        foreignKey: "EventsId",
      });
    }
  }
  EventOrganizers.init(
    {
      username: DataTypes.STRING,
      organizerName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      contact: DataTypes.STRING,
      image: DataTypes.STRING,
      isOrganizer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "EventOrganizers",
    }
  );
  return EventOrganizers;
};
