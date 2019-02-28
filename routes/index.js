"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  function createProductOrder(orderId, order) {
    knex('product_orders').insert({
      quantity: order.quantity,
      product_id: order.id,
      order_id: orderId
    });
  }

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/", (req, res) => {
    var newOrder = req.body.order;
    knex('orders').insert({
      time_stamp: knex.fn.now()
    }, ['id'])
    .then(id => {
      console.log(id);
      createProductOrder(id, newOrder);
    })
    .catch(err => {
      throw err;
    })
  });

  return router;
}