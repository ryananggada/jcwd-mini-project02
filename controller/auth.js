require("dotenv").config();
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { User, Profile, Referral } = require("../models");
const { EventOrganizers } = require("../models");
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

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });

  if (existingUser) {
    return res.status(400).json({
      ok: false,
      message: "Username or email already used",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const referralCode = username + Math.floor(Math.random() * 1000);
    const referrals = await Referral.create({
      code: referralCode,
    });

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      ReferralId: referrals.id,
      referralCode: referralCode,
      firstName: firstName,
      lastName: lastName,
      age: age,
      phoneNumber: phoneNumber,
      city: city,
    });

    const newProfile = await Profile.create({
      userId: newUser.id,
      firstName,
      lastName,
      ReferralId: referrals.id,
      referralCode: referralCode,
      age,
      phoneNumber,
      city,
    });

    return res.json({
      ok: true,
      data: {
        username: newUser.username,
        email: newUser.email,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        ReferralId: referrals.id,
        referralCode: referralCode,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "An error occurred while registering the user.",
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

    const payload = { id: user.id };
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

exports.handleOrganizerRegister = async (req, res) => {
  const { username, email, password, organizerName, phoneNumber, city } =
    req.body;

  const existingUser = await EventOrganizers.findOne({
    where: {
      [Op.or]: [
        { username: username },
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    },
  });

  if (existingUser) {
    return res.status(400).json({
      ok: false,
      message: "Username, email, or phone number already used",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const newOrganizer = await EventOrganizers.create({
      username,
      organizerName,
      email,
      password: hashPassword,
      isOrganizer: true,
      phoneNumber,
      city,
    });

    return res.json({
      ok: true,
      data: {
        username: newOrganizer.username,
        email: newOrganizer.email,
        organizerName: newOrganizer.organizerName,
        phoneNumber: newOrganizer.phoneNumber,
        city: newOrganizer.city,
        isOrganizer: newOrganizer.isOrganizer,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "An error occurred while registering the organizer.",
    });
  }
};

exports.handleOrganizerLogin = async (req, res) => {
  const { user_identity: userIdentity, password } = req.body;

  try {
    const organizer = await EventOrganizers.findOne({
      where: {
        [Op.or]: [{ username: userIdentity }, { email: userIdentity }],
      },
    });

    if (!organizer) {
      res.status(401).json({ ok: false, message: "Incorrect User/Password" });
      return;
    }

    console.log(password, organizer.password);
    const isValid = await bcrypt.compare(password, organizer.password);
    if (!isValid) {
      res.status(401).json({ ok: false, message: "Incorrect User/Password" });
      return;
    }

    const payload = { id: organizer.id, isVerified: organizer.isVerified };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const profileData = {
      email: organizer.email,
      username: organizer.username,
      isVerified: organizer.isVerified,
      organizerName: organizer.organizerName,
      phoneNumber: organizer.phoneNumber,
      city: organizer.city,
    };

    res.json({
      ok: true,
      data: {
        token,
        profile: profileData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
