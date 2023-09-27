const { Events } = require("../models");

exports.handleGetEvents = async (req, res) => {
  const events = await Events.findAll();
  res.json({ ok: true, data: events });
};

exports.handleEventCreation = async (req, res) => {
  const { name, description, date, time, venue, city, poster, category } =
    req.body;
  try {
    const event = await Events.create({
      name,
      description,
      date,
      time,
      venue,
      city,
      poster,
      category,
    });

    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
