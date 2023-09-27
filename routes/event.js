const router = require("express").Router();
const eventController = require("../controller/event");

router.get("/", eventController.handleGetEvents);
router.post("/eventcreation", eventController.handleEventCreation);

module.exports = router;
