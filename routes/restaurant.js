"use strict";
const express = require('express');
const router = express.Router();
const twilio = require("twilio");
const accountSid = "AC00a4b43fa33d38e988101427f710d8ee"; // Your Account SID from www.twilio.com/console
const authToken = "c7ddf7090ebf04a597f74545d2f06b76"; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
module.exports = (knex) => {

  //function to text customers
  client.messages.create({
      body: 'Your food will be ready in pick_up_time minutes',
      to: 'GUEST.PHONE', // PHONE NUMBER PROVIDED BY DB, can use function?
      from: '+16042393009' // this is our Twilio server number
    })
    .then((message) => console.log(message.sid));

  //update DB
  function addPickup() {
    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .update({
        pick_up_time: 'form_field_input'
      });
  }

  //update DB
  function addPending() {
    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .update({
        pending: true
      });
  }

  //render page on refresh
  router.get('/', (req, res) => {

    //join tables needed to call order data
    knex.from('products')
      .innerJoin('product_orders', 'product_orders.product_id', 'products.id')
      .innerJoin('orders', 'orders.id', 'product_orders.order_id')
      .select("*")
      .then(rows => {
        console.log("rows are", rows)
        res.render("restaurant", {
          rows
        });
      })
      .catch(err => console.error("not able to retrieve from database"))
  });

  //THE REQ IS FROM THE SUBMIT BUTTON EVENT
  router.post('/:confirm-order-button-id', (req, res) => {

    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .then(() => {
        addPickup();
        addPending();
        client.messages.create();
        res.redirect('/restaurant');
      })
      //can update customers via order page
      .catch((err) => {
        console.log('DB update failed', err);
      });

    //alternatively, async update the page by looping
    //back to on.event button

    //ie. send a response in the form of JSON to restaurant_button.js
    //to ie. adjust the confirm order button
  });


  return router;
}
