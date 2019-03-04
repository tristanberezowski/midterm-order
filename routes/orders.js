"use strict";
const express = require("express");
const router = express.Router();
const twilio = require('twilio');
const accountSid = 'AC00a4b43fa33d38e988101427f710d8ee'; // Your Account SID from www.twilio.com/console
const authToken = 'c7ddf7090ebf04a597f74545d2f06b76'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

function textRestaurant() {
  client.messages.create({

      body: 'A new order has been placed!',
      to: 6042199134, // NUMBER WE WANT TO TEXT
      from: '+16042393009' // THIS IS OUR TWILIO SERVER NUMBER

    })
    .then((message) => console.log(message.sid));
  }


module.exports = knex => {

  router.get("/:order", (req, res) => {
    res.render("order");
  })

  router.post("/", (req, res) => {
    console.log(req.body)
    knex("guests")
    .insert({
      name: req.body.fname,
      phone: req.body.lname,
      order_id: Number(req.body.order_id)
    })
    .then((result) => {
      textRestaurant();
      res.status(202).end();
    })
    .catch((err) => console.error("issue with inserting user data"));
  })

  return router;
}