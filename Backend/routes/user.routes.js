const express = require("express");
const {
  fetchUser,
  login,
  register,
  getLoggedInUser,
  fetchUsersPaginated,
  updateUser,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/loggedInUser", getLoggedInUser);
userRouter.post("/login", login);
userRouter.post("/register", register);

userRouter.get("/all", fetchUsersPaginated);
userRouter.post("/updateUser/:id", updateUser);
userRouter.get("/:id", fetchUser);

module.exports = userRouter;
