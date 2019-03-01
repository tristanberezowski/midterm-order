/* owner page, on submit event, inserts field value as an update to
existing row in orders */
const express = require("express");
const router = express.Router();
module.exports = knex => {

  function addPickup() = {
    knex('orders')
    .where('ID FOR PARTICULAR ORDER')
    .update({
      pick_up_time: 'form_field_input'
    })
  }

  $(() => {

    $('confirm-order-button-id').on('submit', (event) => {
      event.preventDefault();

      if ('order.id') {
        //update pick up time by order.id
        addPickup();

        // send sms to guest.phone_number

      }
      .fail((err) => {
        console.log(err);
      });
    });

    //function to adjust UI on owner page

  });


}
