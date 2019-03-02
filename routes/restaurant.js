"use strict";

const express = require("express");
const router = express.Router();
module.exports = knex => {
  router.get("/owner", (req, res) => {
    //join tables needed to call order data
    knex
      .select("*")
      .from("product_orders")
      .join("orders", "orders_id", "orders.id")
      .join("products", "product_id", "products.id")
      .where(!"pick_up_time")
      //pass data to ejs to print
      .then(product_orders => {
        let templateVars = {
          product_orders
        };
        res.render("owners", templateVars);
      })
      .catch(err => {
        throw err;
      });
  });
};

//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
