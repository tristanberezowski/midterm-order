"use strict";

const express = require("express");
const router = express.Router();
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const accountSid = 'AC00a4b43fa33d38e988101427f710d8ee'; // Your Account SID from www.twilio.com/console
const authToken = 'c7ddf7090ebf04a597f74545d2f06b76'; // Your Auth Token from www.twilio.com/console

module.exports = knex => {

  client.messages.create({
      body: 'Your food will be ready in pick_up_time',
      to: 'GUEST.PHONE', // Text this number
      from: '+16042393009' // this is our Twilio server number
    })
    .then((message) => console.log(message.sid));

  function addPickup() {
    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .update({
        pick_up_time: 'form_field_input'
      })
  }

  router.get('/owner', (req, res) => {
    //join tables needed to call order data
    knex.select('*')
      .from('product_orders')
      .join('orders', 'orders_id', 'orders.id')
      .join('products', 'product_id', 'products.id')
      .where(!'pick_up_time')

      //pass data to ejs to print
      .then(product_orders => {
        let templateVars = {
          product_orders
        };
        res.render('owners', templateVars)
      })
      .catch(err => {
        throw err;
      })
  });

  //THE REQ IS FROM THE SUBMIT BUTTON EVENT
  router.get('/owner', (req, res) => {

    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .then(() => {
        addPickup();
        client.messages.create();
      })

      .catch((err) => {
        console.log('query obj DNE', err);
      });

    res.redirect('/owner');
    //WHEN WE REDIRECT THE ORDER WILL NOT BE !pick_up_time
  });

};

//CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES
