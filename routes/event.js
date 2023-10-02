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
  authMiddleware.validateOrganizerToken,
  multerUpload.single("poster"),
  eventController.handleEventCreation
);

// for event poster (buggy)
// router.post(
//   "/poster_upload",
//   authMiddleware.validateToken,
//   multerUpload.single("file"),
//   authController.handlePosterUpload
// );

module.exports = router;
