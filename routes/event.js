const router = require("express").Router();
const eventController = require("../controller/event");
const { multerUpload } = require("../lib/multer");
const authMiddleware = require("../middleware/auth");

router.get("/all", eventController.handleGetEvents);
router.get("/search/:id", eventController.getEventById);
router.get("/search/category/:category", eventController.getEventByCategory);
router.get("/search/city/:city", eventController.getEventByCity);
router.get(
  "/search/organizer/:search",
  eventController.getEventByOrganizerName
);
router.get("/search/:search", eventController.getEventBySearch);

router.post(
  "/eventcreation",
  authMiddleware.validateToken,
  multerUpload.single("poster"),
  eventController.handleEventCreation
);

module.exports = router;
