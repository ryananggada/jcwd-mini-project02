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

router.post("/organizer_register", authController.handleOrganizerRegister);
router.post("/organizer", authController.handleOrganizerLogin);
router.patch(
  "/organizer-profile",
  authMiddleware.validateToken,
  authController.updateOrganizerProfile
);

module.exports = router;
