"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  function createProductOrder(orderId) {
    knex('product_orders').insert({
      quantity: 2,
      product_id: 1,
      order_id: orderId
    });
  }

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/", (req, res) => {
    let newOrder = req.body.order;
    knex('orders').insert({
      
    }, ['id'])
    .then(id => {
      createProductOrder(id);
    })
    .catch(err => {
      throw err;
    })
  });

  return router;
}