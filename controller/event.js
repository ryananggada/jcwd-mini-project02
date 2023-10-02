const e = require("express");
const { Events, EventOrganizers } = require("../models");
const { Op } = require("sequelize");

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
      EventOrganizersId: req.user.id,
    });

    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

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
      name: event.name,
      id: event.id,
      organizerId: event.EventOrganizersId,
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

exports.getEventByOrganizerName = async (req, res) => {
  const { search } = req.params;
  try {
    const event = await Events.findAll({
      include: [
        {
          model: EventOrganizers,
          where: {
            organizerName: {
              [Op.like]: `%${search}%`,
            },
          },
        },
      ],
    });
    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEventByOrganizerId = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findAll({
      where: {
        EventOrganizersId: id,
      },
    });
    res.json({ ok: true, data: event });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.handleDeleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.destroy({ where: { id } });
    res.json({ ok: true, data: event, message: "Event deleted" });
  } catch {
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.handleEditEvent = async (req, res) => {
  const { id } = req.params;
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
    const event = await Events.findOne({ where: { id } });

    if (!event) {
      return res.status(404).json({ ok: false, message: "Event not found" });
    }

    event.name = name;
    event.description = description;
    event.date = date;
    event.time = time;
    event.venue = venue;
    event.city = city;
    event.category = category;
    event.regularTicket = regularTicket;
    event.vipTicket = vipTicket;

    // Save the updated event
    await event.save();

    res.json({ ok: true, data: event, message: "Event Updated" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
