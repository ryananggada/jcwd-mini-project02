const router = require("express").Router();
const eventController = require("../controller/event");

router.get("/", eventController.handleGetEvents);

module.exports = router;
