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
    console.log('asdawdasd');
    knex
      .select('*')
      .from('products')
      .innerJoin('product_orders', 'product_orders.product_id', 'products.id')
      .innerJoin('orders', 'orders.id', 'product_orders.order_id')
      .innerjoin('guests', 'orders.id', 'order_id')
      .then((ordersObj) => {
        res.json(ordersObj);
      });
  });


  router.get("/orders/:id", (req, res) => {
    knex.from('products')
      .innerJoin('product_orders', 'product_orders.product_id', 'products.id')
      .innerJoin('orders', 'orders.id', 'product_orders.order_id')
      .select("product_orders.quantity", "products.price", "products.name", "products.img", "description")
      .where('orders.id', req.params.id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.error("error getting order products");
      });
  });

  return router;
}
