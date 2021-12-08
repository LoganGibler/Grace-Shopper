const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

apiRouter.get("/", (req, res, next) => {
  console.log("Request was made to /");
  res.send({
    message: "API is under construction!"
  });
  next();
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const sellersRouter = require("./sellers")
apiRouter.use("/sellers", sellersRouter)

const productsRouter = require("./products")
apiRouter.use("/products", productsRouter)

const ordersRouter = require("./orders")
apiRouter.use("/orders", ordersRouter)

module.exports = apiRouter;
