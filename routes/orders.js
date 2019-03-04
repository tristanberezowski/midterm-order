"use strict";
const express = require("express");
const router = express.Router();

module.exports = knex => {

  router.get("/:order", (req, res) => {
    res.render("order");
  })

  router.post("/", (req, res) => {
    console.log(req.body)
    knex("guests")
    .insert({
      name: req.body.fname,
      phone: req.body.lname,
      order_id: Number(req.body.order_id)
    })
    .then((result) => res.status(202).end())
    .catch((err) => console.error("issue with inserting user data"));
  })

  return router;
}