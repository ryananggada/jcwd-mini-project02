const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { EventOrganizers } = require("../models");

exports.validateToken = async (req, res, next) => {
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
    const isOrganizer = await EventOrganizers.findOne({
      where: {
        id: payload.id,
        isOrganizer: true,
      },
    });

    if (!isOrganizer) {
      res.status(403).json({
        ok: false,
        message: "Access forbidden. Only organizers can access this route.",
      });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: String(error),
    });
  }
};
