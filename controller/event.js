const { Event } = require("../models");

exports.handleGetEvents = async (req, res) => {
  const events = await Event.findAll();
  res.json({ ok: true, data: events });
};
