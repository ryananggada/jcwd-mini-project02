const router = require("express").Router();
const eventController = require("../controller/event");
const { multerUpload } = require("../lib/multer");
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.get("/", eventController.handleGetEvents);
router.post("/eventcreation", eventController.handleEventCreation);

// for event poster (buggy)
/*
router.post(
  "/posterUpload",
  authMiddleware.validateToken,
  multerUpload.single("file"),
  authController.handlePosterUpload
);
*/

module.exports = router;
