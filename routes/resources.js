"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/products", (req, res) => {
    knex
      .select("*")
      .from("products")
      .then((results) => {
        res.json(results);
      });
  });

  //route to create json obj for html element creation
  router.get('/orders', (req, res) => {
    knex
      .select('*')
      .from('orders')
      .then((ordersObj) => {
        res.json(ordersObj);
      });
  });

  return router;
}
