"use strict";

const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const accountSid = "AC00a4b43fa33d38e988101427f710d8ee"; // Your Account SID from www.twilio.com/console
const authToken = "c7ddf7090ebf04a597f74545d2f06b76"; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
module.exports = knex => {
  router.get("/", (req, res) => {
    //join tables needed to call order data
    knex
      .from('product_orders')
      .join('orders', 'order_id', 'orders.id')
      .join('products', 'product_id', 'products.id')
      .where('pick_up_time', '=', '0')
      .orWhere('pending', '=', 'true')
      .select('*')
      .then(product_orders => {
        let templateVars = {
          product_orders
        };
        res.render("restaurant", templateVars);
      })
      .catch(err => {
        console.error("not able to retrieve from database");
        throw err;
      });
  });

  return router;
};

//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
