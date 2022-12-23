const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const userModel = require("../database/models/user.model");
const eventModel = require("../database/models/event.model");

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
    JWT_SECRET
  );
}

async function fetchUsersPaginated(req, res) {
  const {
    pageSize = 10,
    page = 1,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const totalUser = await userModel.find().count();

  const users = await userModel
    .find()
    .select("-password")
    .sort({
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return res.send({
    status: "success",
    data: {
      totalUser,
      users,
      page,
      pageSize,
    },
  });
}

async function fetchUser(req, res) {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (user) {
    let userResponse = user.toJSON();

    delete userResponse.password;

    return res.status(200).send({
      status: "success",
      data: userResponse,
    });
  } else {
    return res.status(500).send({
      status: "error",
      message: "User does not exist",
    });
  }
}

async function login(req, res) {
  const user = req.body;

  let { email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });
  if (existingUser) {
    let match = bcrypt.compareSync(password, existingUser.password);

    if (match) {
      // produce a JWT token
      let token = generateToken(existingUser);
      let name = existingUser.name;
      let id = existingUser._id;
      return res.status(200).send({
        status: "success",
        data: {
          name,
          id,
          token,
        },
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Password is wrong",
      });
    }
  } else {
    return res.status(400).send({
      status: "error",
      message: "User does not exist with the given email",
    });
  }
}

async function getLoggedInUser(req, res) {
  const { user } = req;

  if (user) {
    return res.status(200).send({
      status: "success",
      data: user,
    });
  } else {
    return res.status(400).send({
      status: "error",
      message: "User not logged in",
    });
  }
}

async function register(req, res) {
  const user = req.body;

  let { name, email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400).send({
      status: "error",
      message: "User already exists with the given email",
    });
  } else {
    password = bcrypt.hashSync(password);
    let user = await userModel.create({
      name,
      email,
      password,
    });

    user = user.toJSON();

    delete user.password;

    return res.status(200).send({
      status: "success",
      data: user,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    let { id: eventId } = req.body;

    let user = await userModel.findOne({ _id: id });
    // let event = await eventModel.find({ _id: eventId });
    let event = await eventModel.findOne({ _id: eventId });
    if (user.requestedEvents === undefined) {
      user.requestedEvents = [];
    }
    user.requestedEvents.push(event);

    let ackData = await userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          requestedEvents: user.requestedEvents,
        },
      }
    );
    if (ackData.acknowledged) {
      return res.send({
        status: "success",
        data: user,
      });
    } else {
      return res.send({
        status: "failed",
        data: "rating updation failed",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

module.exports = {
  fetchUser,
  register,
  login,
  getLoggedInUser,
  fetchUsersPaginated,
  updateUser,
};
