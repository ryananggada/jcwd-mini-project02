require("dotenv").config();
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { User, Profile } = require("../models");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.handleRegister = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    age,
    phoneNumber,
    city,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const newProfile = await Profile.create({
      userId: newUser.id,
      firstName,
      lastName,
      age,
      phoneNumber,
      city,
    });

    res.json({
      ok: true,
      data: {
        username: newUser.username,
        email: newUser.email,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
      },
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.handleLogin = async (req, res) => {
  const { user_identity: userIdentity, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: { username: userIdentity, email: userIdentity },
      },
      include: Profile,
    });

    if (!user) {
      res.status(401).json({ ok: false, message: "Incorrect User/Password" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ ok: false, message: "Incorrect User/Password" });
      return;
    }

    const payload = { id: user.id, isVerified: user.isVerified };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      ok: true,
      data: {
        token,
        profile: {
          email: user.email,
          username: user.username,
          firstName: user.Profile.firstName,
          lastName: user.Profile.lastName,
          age: user.Profile.age,
          phoneNumber: user.Profile.phoneNumber,
          city: user.Profile.city,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { email, username, firstName, lastName, age, phoneNumber, city } =
    req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({
        ok: false,
        message: "User not found",
      });
      return;
    }

    if (email) {
      user.email = email;
      user.isVerified = false;
    }
    if (username) {
      user.username = username;
    }

    await user.save();

    const profile = await user.getProfile();
    if (firstName) {
      profile.firstName = firstName;
    }
    if (lastName) {
      profile.lastName = lastName;
    }
    if (age) {
      profile.firstName = firstName;
    }
    if (phoneNumber) {
      profile.phoneNumber = phoneNumber;
    }
    if (city) {
      profile.city = city;
    }

    await profile.save();

    return res.json({
      ok: true,
      data: {
        email: user.email,
        username: user.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        phoneNumber: profile.phoneNumber,
        city: profile.city,
      },
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: String(error),
    });
  }
};
