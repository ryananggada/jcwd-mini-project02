const router = require("express").Router();

const authMiddleware = require("../middleware/auth");
const couponController = require("../controller/coupon");

router.post(
  "/",
  authMiddleware.validateOrganizerToken,
  couponController.handleAddCoupon
);
router.get("/", couponController.handleGetCoupons);
router.get("/:id", couponController.handleGetOneCoupon);
router.patch("/:id", couponController.handleEditCoupon);
router.delete("/:id", couponController.handleDeleteCoupon);

module.exports = router;
