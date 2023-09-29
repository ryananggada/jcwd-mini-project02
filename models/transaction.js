"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "userId" });
      Transaction.belongsTo(models.Events, { foreignKey: "eventId" });
      Transaction.belongsTo(models.Coupon, { foreignKey: "couponId" });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      couponId: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      transactionDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
