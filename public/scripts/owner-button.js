/* owner page, on submit event, inserts field value as an update to
existing row in orders */
const express = require("express");
const router = express.Router();
module.exports = knex => {

  //CHECK ALL VARIBLES, QUERIES, AND ROUTE NAMES

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
