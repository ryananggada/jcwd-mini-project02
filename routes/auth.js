const router = require("express").Router();

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.post("/register", authController.handleRegister);
router.post("/", authController.handleLogin);
router.patch(
  "/profile",
  authMiddleware.validateToken,
  authController.updateProfile
);

module.exports = router;
