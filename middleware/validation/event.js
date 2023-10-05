const { body, validationResult } = require("express-validator");

const priceSanitizer = (value, { req }) => {
  return parseInt(value, 10);
};

exports.validateEventCreation = [
  body("name")
    .isLength({ min: 5, max: 500 })
    .withMessage("Event Name must be between 5 and 500 characters long"),
  body("description")
    .isLength({ min: 5, max: 500 })
    .withMessage("Event Description must be between 5 and 500 characters long"),
  body("city")
    .isLength({ min: 5, max: 500 })
    .withMessage("Event City must be between 5 and 500 characters long"),
  body("venue")
    .isLength({ min: 5, max: 500 })
    .withMessage("Event Venue must be between 5 and 500 characters long"),
  body("date")
    .isLength({ min: 5, max: 500 })
    .withMessage("Event Date must be between 5 and 500 characters long"),
  body("time")
    .isLength({ min: 5, max: 500 })
    .withMessage("Event Time must be between 5 and 500 characters long"),
  body("regularTicket")
    .customSanitizer(priceSanitizer)
    .isInt()
    .withMessage("Event Price must be an integer"),
  body("vipTicket")
    .customSanitizer(priceSanitizer)
    .isInt()
    .withMessage("Event Price must be an integer"),
  body("category")
    .isIn(["music", "webinar", "sports"])
    .withMessage(
      "Event Category must be one of 'music', 'webinar', or 'sports'"
    ),
];

exports.eventCreationChecker = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  next();
};
