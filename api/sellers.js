const express = require("express");
const sellersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllSellers } = require("../db");

sellersRouter.get("/", async (req, res) => {
  console.log("request to sellers");
  const sellers = await getAllSellers();
  console.log(sellers)
  res.send({
    sellers,
  });
});


module.exports = sellersRouter;
