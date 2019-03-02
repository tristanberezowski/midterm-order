const express = require("express");
const router = express.Router();

const twilio = require('twilio');
var accountSid = 'AC00a4b43fa33d38e988101427f710d8ee'; // Your Account SID from www.twilio.com/console
var authToken = 'c7ddf7090ebf04a597f74545d2f06b76'; // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

module.exports = knex => {

  //CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES

  client.messages.create({
      body: 'You have a food order',
      to: 'GUEST.PHONE', // Text this number
      from: '+16042393009' // this is a valid Twilio number
    })
    .then((message) => console.log(message.sid));

  function addPickup() {
    knex('orders')
      .where('ID FOR THIS PARTICULAR ORDER')
      .update({
        pick_up_time: 'form_field_input'
      })
  }

  $(() => {

    $('confirm-order-button-id').on('submit', (event) => {
      event.preventDefault();

      //update pick up time by order.id
      knex('orders')
        .where('ID FOR THIS PARTICULAR ORDER')
        .then(() => {
          addPickup();
          // send sms to guest.phone_number
        })

        .catch((err) => {
          console.log('query obj DNE', err);
        });

      //function to adjust order UI on owner page

    });

  });
}
