/* owner page, on submit event, inserts field value as an update to
existing row in orders */

//FNC ABSOLUTELY NOT DONE


function addPickup() = {
  knex('orders')
  .where('ID FOR PARTICULAR ORDER')
  .update({
    pick_up_time: 'INTEGERS ONLY'
  })
}

$(() => {

  $('confirm-order-JQ-classification-change this').on('submit', (event) => {
    event.preventDefault();

    if ('some requirement for array') {
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
