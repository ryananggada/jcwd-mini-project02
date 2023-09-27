"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrganizerProfile extends Model {
    static associate(models) {
      OrganizerProfile.belongsTo(models.EventOrganizers, {
        foreignKey: "organizerId",
      });
    }
  }
  OrganizerProfile.init(
    {
      OrganizerName: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrganizerProfile",
    }
  );
  return OrganizerProfile;
};
