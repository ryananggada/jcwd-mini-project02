require("dotenv").config();

const { Coupon } = require("sequelize");

exports.handleAddCoupon = async (req, res) => {
  const { couponCode, discount } = req.body;

  try {
    const coupon = await Coupon.create({
      couponCode,
      discount,
    });

    res.json({ ok: true, data: coupon });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
