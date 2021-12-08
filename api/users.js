const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET = "neverTell" } = process.env;
const { getAllUsers, getUserByUsername, createUser } = require("../db/users");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, cart, canSell } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
        // res.status(401)
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
    const user = await createUser({
      username,
      password,
      cart,
      canSell,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    console.log("this is token", token);

    res.send({
      username: username,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await getAllUsers();

  res.send({
    users,
  });
});

usersRouter.post("/login", async (req, res, next) => {
  console.log("Request was made to /login");
  const { username, password } = req.body;
  console.log("this is username and password", username, password);
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);
    console.log("this is user", user);
    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      console.log("this is token", token);
      res.send({user, token, message: "you are logged in!"});
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Your username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
