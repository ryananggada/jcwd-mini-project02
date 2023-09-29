require("dotenv").config();

const { Transaction } = require("sequelize");

exports.handleAddTransaction = async (req, res) => {
  const { userId, eventId, couponId, totalPrice, transactionDate } = req.body;

  try {
    const transaction = await Transaction.create({
      userId,
      eventId,
      couponId,
      totalPrice,
      transactionDate,
    });

    res.json({ ok: true, data: transaction });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
