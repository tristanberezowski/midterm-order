// Script for restaurant.ejs
// Creates html structure in restaurant page

function convertDate(time) {
  let date = new Date(time);
  let hours = date.getHours();
  let ampm;
  if (hours > 12) {
    if (hours === 12)
      ampm = "pm";
    else {
      ampm = "pm"
      hours -= 12;
    }
  }
  else
    ampm = "am";
  let minutes = "0" + date.getMinutes();
  return hours + ':' + minutes.substr(-2) + ampm;
}


function addOrderHeader(order) { //adds a header for each order
  let contents = `
    <div class="accordion-header">Order ${order.order_id} from ${order.guest_name}, ${order.phone} at ${convertDate(order.time_stamp)}</div>
    <div class="accordion-content">
      <div class="order-items" class="d-flex justify-content-start order-item"></div>
    </div>
    `;
  $(contents).appendTo("#orders");
}
//calls information for an order to give to addOrderContent to append contents to order header
function addAllContent(order_id) {
  $.ajax({
    method: 'GET',
    url: `/api/orders/${order_id}`
  }).done(order => { //gets an array of order_id, guest_name, phone
      for(contents of order) {
        addOrderContent(contents);
      }
    });
}

function addOrderContent(details) {
  let showOrder = `
      <div class="d-flex justify-content-start">
          <div class="container">
              <div class="row">
                <div class="col-sm">
                    <div class="order-total">
                      <h4>Order Total - $15,00</h4>
                    </div>
                    <form class="restaurant-form">
                      <input type="text" name="lname" type="number" placeholder="Time for pick up"/><br />
                      <button type="submit" value="Submit">Accept Order</button>
                    </form>
                </div>
              </div>
          </div>
      </div>
      `;
  return $(".accordian-content").append(showOrder);
}

// Creates html structure in restaurant page
function addItemsToOrder() {
  let orderItems = `
    <div class="row">
                <div class="col-12 col-md-2"><img class="order-item-image" src="./images/product1.webp" /></div>
                <div class="col-12 col-md-6 ">
                  <p class="order-item-name">Gourmet Hot Dog</p>
                </div>
                <div class="col-12 col-md-2"><p class="order-item-quantity">Qty 1</p></div>
                <div class="col-12 col-md-2"><p class="order-item-price">$ 3.99</p></div>
              </div>`;
  return $(".order-items").append(orderItems);
}

$(() => {
  
  $.ajax({
    method: 'GET',
    url: '/api/orders'
  }).done(orders => { //gets an array of order_id, guest_name, phone
    for(order of orders) {
      addOrderHeader(order);
      addAllContent(order.order_id);
    }
  });

  // Accordion functionality for orders
  $(".accordion").on("click", ".accordion-header", function () {
    $(this)
      .toggleClass("active")
      .next()
      .slideToggle();
  });

  $('confirm-order-button-ID').on('submit', (event) => {
    event.preventDefault();
    $.post('/restaurant/')
      .done(() => {
        console.log("POSTED");
      })
      .fail((err) => {
        console.error("Post failed");
      })
  });
  
});

  
