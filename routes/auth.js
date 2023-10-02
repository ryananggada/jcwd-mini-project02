const router = require("express").Router();

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");
const authValidation = require("../middleware/validation/auth");

router.post(
  "/register",
  authValidation.validateRegisterUser,
  authValidation.registerChecker,
  authController.handleRegister
);
router.post("/", authController.handleLogin);
router.patch(
  "/profile",
  authMiddleware.validateUserToken,
  authController.updateProfile
);

router.post(
  "/organizer_register",
  authValidation.validateRegisterOrganizer,
  authValidation.registerChecker,
  authController.handleOrganizerRegister
);
router.post("/organizer", authController.handleOrganizerLogin);
router.patch(
  "/organizer_profile",
  authMiddleware.validateOrganizerToken,
  authController.updateOrganizerProfile
);

module.exports = router;
