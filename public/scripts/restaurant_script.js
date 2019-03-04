//create order id html element
const orderFunction1 = function (orderObj) {
  let orderhtml = `
  `;
  let $orderHtml = $(orderHtml);
  return $orderHtml;
};

//create order detais html element
const orderFunction2 = function (orderObj) {

};

// request to resource.js create json obj
$(() => {
  $.ajax({
    method: 'GET',
    url: '/api/orders'
  }).done(orderObj => {

    //recieving DB order data in json obj
    //orderFunction1(orderObj) to create html element
    //orderFunction2(orderObj) to create html element
    //action to display html element

  });
});

$(() => {
  $('confirm-order-button-ID').on('submit', (event) => {
    event.preventDefault();

    $.post('/restaurant-BE')

    //to adjust the /:restaurant_form_field
    //receive the JSON response here from restaurant.js route
    // ie. Hide the div 
  });
});
