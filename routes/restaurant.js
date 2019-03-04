"use strict";
const express = require('express');
const router = express.Router();
const twilio = require("twilio");
const accountSid = "AC00a4b43fa33d38e988101427f710d8ee"; // Your Account SID from www.twilio.com/console
const authToken = "c7ddf7090ebf04a597f74545d2f06b76"; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

function textCustomer(phone, time) {
  console.log(phone)

  client.messages.create({

      body: `Your food will be ready in ${time} minutes! Thank you for ordering with Foody!`,
      to: `${phone}`, // NUMBER WE WANT TO TEXT
      from: '+16042393009' // THIS IS OUR TWILIO SERVER NUMBER

    })
    .then((message) => console.log(message.sid));
  }

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("restaurant")
  });

  //THE REQ IS FROM THE SUBMIT BUTTON EVENT
  router.post('/', (req, res) => {
    knex('orders')
      .where('id', req.body.id)
      .update({
        pick_up_time: req.body.pickUpTime
      })
      .then(() => {
        knex.from('guests')
        .where('order_id', req.body.id)
        .select('phone')
        .then((result) => {
          textCustomer(result[0].phone, req.body.pickUpTime)
        })
      })
      .then(() => {
        res.status(202).end();
      })
      .catch((err) => {
        console.log('DB update failed', err);
      })
    })

  return router;
}
