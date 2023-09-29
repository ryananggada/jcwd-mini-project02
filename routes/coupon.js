const router = require("express").Router();
const couponController = require("../controller/coupon");

router.post("/", couponController.handleAddCoupon);

module.exports = router;
