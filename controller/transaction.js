require("dotenv").config();

const { Transaction, Coupon, Events } = require("../models");

exports.handleAddTransaction = async (req, res) => {
  const { eventId, couponId, ticketType, transactionDate } = req.body;

  const userId = req.user.id;
  let totalPrice = 0;

  try {
    const event = await Events.findOne({
      where: { id: eventId },
    });

    if (ticketType === "regular") {
      totalPrice = event.regularTicket;
    } else if (ticketType === "vip") {
      totalPrice = event.vipTicket;
    } else {
      res.status(400).json({
        ok: false,
        message: "Ticket type can only be 'regular' or 'vip'",
      });
      return;
    }

    const coupon = await Coupon.findOne({
      where: { id: couponId },
    });

    if (coupon !== null) {
      totalPrice = totalPrice * (1.0 - coupon.discount);
    }

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
