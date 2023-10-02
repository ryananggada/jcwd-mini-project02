const router = require("express").Router();

const authMiddleware = require("../middleware/auth");
const couponController = require("../controller/coupon");

router.post(
  "/",
  authMiddleware.validateOrganizerToken,
  couponController.handleAddCoupon
);

module.exports = router;
