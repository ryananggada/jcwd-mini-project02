"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    static associate(models) {}
  }
  Referral.init(
    {
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Referral",
    }
  );
  return Referral;
};
