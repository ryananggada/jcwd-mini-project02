require("dotenv").config();

const { Coupon } = require("../models");

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

exports.handleEditCoupon = async (req, res) => {
  const { id } = req.params;
  const { couponCode, discount } = req.body;

  try {
    const coupon = await Coupon.findOne({ where: { id } });
    if (!coupon) {
      return res.status(404).json({ ok: false, message: "Coupon not found" });
    }

    coupon.couponCode = couponCode;
    coupon.discount = discount;

    await coupon.save();
    res.json({
      ok: true,
      data: coupon,
      message: "Coupon successfully editted",
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.handleGetCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();

    res.status(200).json({
      ok: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.handleGetOneCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findOne({
      where: { id },
    });

    res.status(200).json({
      ok: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.handleDeleteCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.destroy({ where: { id } });
    res.json({ ok: true, data: coupon, message: "Coupon deleted" });
  } catch {
    res.status(500).json({ ok: false, message: error.message });
  }
};
