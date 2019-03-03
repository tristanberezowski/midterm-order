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

  client.messages.create({
      body: 'Your food will be ready in pick_up_time minutes check syntax',
      to: 'GUEST.PHONE', // PHONE NUMBER PROVIDED BY DB, can use function?
      from: '+16042393009' // this is our Twilio server number
    })
    .then((message) => console.log(message.sid));

  function addPickup() {
    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .update({
        pick_up_time: 'form_field_input'
      });
  }

  function addPending() {
    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .update({
        pending: true
      });
  }

  router.get('/restaurant', (req, res) => {
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
        res.render("owners", templateVars);
      })
      .catch(err => {
        console.error("not able to retrieve from database");
        throw err;
      })
  });

  //THE REQ IS FROM THE SUBMIT BUTTON EVENT
  router.post('/owner/:confirm-order-button-id', (req, res) => {

    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .then(() => {
        addPickup();
        addPending();
        client.messages.create();
        //can update /:order page with order acceptance from here on out
      })

      .catch((err) => {
        console.log('query obj DNE', err);
      });

    res.redirect('/restaurant'); //alternatively, async update the page by looping
    //back to on.event button

    //ie. send a response in the form of JSON to restaurant_button.js
    //to ie. adjust the confirm order button

  });

  return router;
};

//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
