const express = require("express");
const {
  getEventsByUserId,
  createEventPost,
  getEventsPaginated,
  getEventById,
  updateEvent,
} = require("../controllers/event.controllers");

const eventRouter = express.Router();

eventRouter.post("/", createEventPost);

eventRouter.get("/user/:userId", getEventsByUserId);
eventRouter.get("/:id", getEventById);
eventRouter.get("/", getEventsPaginated);
eventRouter.post("/:id", updateEvent);

module.exports = eventRouter;
