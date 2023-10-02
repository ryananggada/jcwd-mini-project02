const { Events } = require("../models");
const jwt = require("jsonwebtoken");

exports.handleGetEvents = async (req, res) => {
  const events = await Events.findAll();
  res.json({ ok: true, data: events });
};

exports.handleEventCreation = async (req, res) => {
  const {
    name,
    description,
    date,
    time,
    venue,
    city,
    poster,
    category,
    regularTicket,
    vipTicket,
  } = req.body;
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
      regularTicket,
      vipTicket,
    });

    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findOne({ where: { id } });
    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEventByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const event = await Events.findAll({ where: { category } });
    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEventByCity = async (req, res) => {
  const { city } = req.params;
  try {
    const event = await Events.findAll({ where: { city } });
    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
