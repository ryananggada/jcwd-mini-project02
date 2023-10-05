"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "userId" });
      User.hasMany(models.Transaction, { foreignKey: "userId" });
      User.belongsTo(models.Referral, { foreignKey: "referralId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
      city: DataTypes.STRING,
      ReferralId: DataTypes.INTEGER,
      referralPoint: DataTypes.INTEGER,
      isOrganizer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
