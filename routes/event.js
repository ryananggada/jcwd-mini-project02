const router = require("express").Router();
const eventController = require("../controller/event");
const { multerUpload } = require("../lib/multer");
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.get("/", eventController.handleGetEvents);
router.get("/:id", eventController.getEventById);
router.get("/category/:category", eventController.getEventByCategory);
router.get("/city/:city", eventController.getEventByCity);
router.get("/search/:search", eventController.getEventBySearch);

router.post(
  "/eventcreation",
  authMiddleware.validateToken,
  multerUpload.single("poster"),
  eventController.handleEventCreation
);

module.exports = router;
