const eventModel = require("../database/models/event.model");
const userModel = require("../database/models/user.model");
const crypto = require("crypto");

async function getEventsByUserId(req, res) {
  const { userId } = req.params;

  const events = await eventModel
    .find({
      "author.authorId": userId,
    })
    .sort({
      createdAt: -1,
    });

  return res.send({
    status: "success",
    data: events,
  });
}

async function getEventsPaginated(req, res) {
  try {
    let {
      search = "",
      pageSize = 12,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const totalEvents = await eventModel
      .find({
        $or: [
          {
            title: {
              $regex: new RegExp(search, "i"),
            },
          },
          {
            icon: {
              $regex: new RegExp(search, "i"),
            },
          },
        ],
      })
      .count();

    const events = await eventModel
      .find({
        $or: [
          {
            title: {
              $regex: new RegExp(search, "i"),
            },
          },
          {
            icon: {
              $regex: new RegExp(search, "i"),
            },
          },
        ],
      })
      .sort({
        [sortBy]: sortOrder === "asc" ? 1 : -1,
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // console.log(events, events);
    return res.send({
      status: "success",
      data: {
        totalEvents,
        events,
        page,
        pageSize,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
}

async function createEventPost(req, res) {
  let event = req.body;
  const { user } = req;

  // add randome rating
  event.rating = Math.round(crypto.randomInt(0, 10) * 0.49 * 100) / 100;

  // add randome icon
  let icons = [];
  for (let j = 0; j < crypto.randomInt(1, 3); j++) {
    let icon = [
      "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP2.png%3Fq%3D20&w=1920&q=50",
      "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP4.png%3Fq%3D20&w=1920&q=50",
      "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP5.png%3Fq%3D20&w=1920&q=50",
      "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP66.png%3Fq%3D20&w=1920&q=50",
      "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP57.png%3Fq%3D20&w=1920&q=50",
      "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP56.png%3Fq%3D20&w=1920&q=50",
    ][crypto.randomInt(0, 6)];
    icons.push(icon);
    event.icons = icons;
    event.icon = icons[crypto.randomInt(0, 5)];
  }

  if (!user) {
    return res.status(400).send({
      status: "error",
      message: "User not logged in",
    });
  }

  event.author = {
    _id: user._id,
    name: user.name,
    image: user.image,
  };

  const eventData = await eventModel.create(event);

  userModel
    .findByIdAndUpdate(user._id, {
      $inc: {
        eventsCount: 1,
      },
    })
    .then(() => {});

  return res.send({
    status: "success",
    data: eventData,
  });
}

async function getEventById(req, res) {
  const { id } = req.params;

  const event = await eventModel.findById(id);

  return res.send({
    status: "success",
    data: event,
  });
}

async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    let eve = req.body;

    let ackData = await eventModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          players: eve.players,
        },
      }
    );
    if (ackData.acknowledged) {
      return res.send({
        status: "success",
        data: ackData,
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
  getEventsByUserId,
  getEventsPaginated,
  createEventPost,
  getEventById,
  updateEvent,
};
