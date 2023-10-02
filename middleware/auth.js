const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { EventOrganizers } = require("../models");

exports.validateUserToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      ok: false,
      message: "Token not found!",
    });
    return;
  }

  try {
    token = token.split(" ")[1];
    if (!token) {
      res.status(401).json({
        ok: false,
        message: "Token not found!",
      });
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    if (!payload) {
      res.status(401).json({
        ok: false,
        message: "Failed to get authorization data",
      });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.validateOrganizerToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      ok: false,
      message: "Token not found!",
    });
    return;
  }

  try {
    token = token.split(" ")[1];
    if (!token) {
      res.status(401).json({
        ok: false,
        message: "Token not found!",
      });
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    if (!payload) {
      res.status(401).json({
        ok: false,
        message: "Failed to get authorization data",
      });
      return;
    }

    // Check if the user is an organizer
    const organizer = await EventOrganizers.findOne({
      where: {
        isOrganizer: true,
      },
    });
    if (organizer === null || !organizer.isOrganizer) {
      res.status(403).json({
        ok: false,
        message: "Access forbidden. Only organizers can access this route.",
      });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: String(error),
    });
  }
};
