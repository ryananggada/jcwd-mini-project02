const { Events, EventOrganizers } = require("../models");
const { Op } = require("sequelize");

exports.handleGetEvents = async (req, res) => {
  try {
    const events = await Events.findAll({
      include: [
        {
          model: EventOrganizers,
          attributes: ["organizerName"],
        },
      ],
    });

    const data = events.map((event) => ({
      id: event.id,
      organizerName: event.organizerName,
      poster: event.poster,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.city,
      category: event.category,
      regularTicket: event.regularTicket,
      vipTicket: event.vipTicket,
    }));
    res.status(200).json({
      ok: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

exports.handleEventCreation = async (req, res) => {
  const { filename } = req.file;
  const {
    name,
    description,
    date,
    time,
    venue,
    city,
    category,
    regularTicket,
    vipTicket,
  } = req.body;
  try {
    const event = await Events.create({
      name,
      poster: filename,
      description,
      date,
      time,
      venue,
      city,
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

exports.getEventBySearch = async (req, res) => {
  const { search } = req.params;
  try {
    const event = await Events.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { city: { [Op.like]: `%${search}%` } },
          { venue: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
