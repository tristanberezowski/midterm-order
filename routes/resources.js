"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/products", (req, res) => {
    knex
      .select("*")
      .from("products")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/order", (req, res) => {
    console.log(req.body)
    // knex
    //   .select("*")
    //   .from()
  })

  return router;
}
