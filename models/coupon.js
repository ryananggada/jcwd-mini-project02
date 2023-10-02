"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      Coupon.hasMany(models.Transaction, { foreignKey: "couponId" });
    }
  }
  Coupon.init(
    {
      couponCode: DataTypes.STRING,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Coupon",
    }
  );
  return Coupon;
};
