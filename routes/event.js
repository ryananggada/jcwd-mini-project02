const router = require("express").Router();
const eventController = require("../controller/event");
const { multerUpload } = require("../lib/multer");
const authMiddleware = require("../middleware/auth");

// get all events
router.get("/all", eventController.handleGetEvents);

// get events by event id
router.get("/:id", eventController.getEventById);

// get events by category
router.get("/category/:category", eventController.getEventByCategory);

// get events by city
router.get("/city/:city", eventController.getEventByCity);

// get events by keyword
router.get("/search/:search", eventController.getEventBySearch);

// get events by organizer id
router.get("/organizerid/:id", eventController.getEventByOrganizerId);

// get events by organizer name
router.get("/organizer/:search", eventController.getEventByOrganizerName);

// event creation route
router.post(
  "/eventcreation",
  authMiddleware.validateOrganizerToken,
  multerUpload.single("poster"),
  eventController.handleEventCreation
);

// event deletion route
router.delete(
  "/:id",
  authMiddleware.validateOrganizerToken,
  eventController.handleDeleteEvent
);

// event edit route
router.patch(
  "/:id",
  authMiddleware.validateOrganizerToken,
  multerUpload.single("poster"),
  eventController.handleEditEvent
);

module.exports = router;
