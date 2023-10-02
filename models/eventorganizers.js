"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventOrganizers extends Model {
    static associate(models) {}
  }
  EventOrganizers.init(
    {
      username: DataTypes.STRING,
      organizerName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      city: DataTypes.STRING,
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
