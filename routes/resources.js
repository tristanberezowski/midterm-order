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

  //route to create json obj for restaurant html element creation
  router.get('/orders', (req, res) => {
    knex.from('orders')
      .innerJoin('guests', 'order_id', 'orders.id')
      .select("orders.id as order_id","guests.name as guest_name", "guests.phone", "time_stamp")
      .then((ordersObj) => {
        console.log(ordersObj);
        res.json(ordersObj);
      });
  });

  router.get("/orders/:id", (req, res) => {
    knex.from('products')
      .innerJoin('product_orders', 'product_orders.product_id', 'products.id')
      .innerJoin('orders', 'orders.id', 'product_orders.order_id')
      .select("product_orders.quantity", "products.price", "products.name", "products.img", "description", "orders.id")
      .where('orders.id', req.params.id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.error("error getting order products");
      });
  });
  router.get("/time/:id", (req, res) => {
    knex("orders")
    .where("id", req.params.id)
    .select("pick_up_time")
    .then(result => {
      console.log("RESULT", result);
      res.json(result[0].pick_up_time);
    })
  })
  

  return router;
}
