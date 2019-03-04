"use strict";
const express = require('express');
const router = express.Router();
const twilio = require("twilio");
const accountSid = "AC00a4b43fa33d38e988101427f710d8ee"; // Your Account SID from www.twilio.com/console
const authToken = "c7ddf7090ebf04a597f74545d2f06b76"; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
module.exports = (knex) => {

  //Function update DB
  function addPickup(id, input) {
    knex('orders')
      .where("id", id)
      .update({
        pick_up_time: input
      });
  }
  
  router.get("/", (req, res) => {
    res.render("restaurant")
  });

  //THE REQ IS FROM THE SUBMIT BUTTON EVENT
  router.post('/:id', (req, res) => {

    knex('orders')
      .where('req.params.id')
      .then(() => {
        addPickup(req.params.id);
        addPending(req.params.id);
        // client.messages.create();
      })
      //CAN NOTIFY CUSTOMERS OF CONFIRM AFTER DB ENTRY
      .catch((err) => {
        console.log('DB update failed', err);
      })
      .then(() => {

        knex()
          .select('phone', 'pick_up_time')
          .from('guests')
          .innerJoin('orders', 'orders.id', 'order_id')
          .where({
            id: req.params.id
          })
          .then(dbResults => {
            dbResults[0].phone
            if (dbResults.length) {
              client.messages.create({
                body: `Your food will be ready in ${dbResults[0].pick_up_time} minutes`,
                to: dbResults[0].phone, // PHONE NUMBER PROVIDED BY DB, can use function?
                from: '+16042393009' // this is our Twilio server number
              })
            }
            res.status(202).end();
          })
          .catch((err) => {
            console.error('Couldnt find phone in DB');
          })
      })
  });


  return router;
}
