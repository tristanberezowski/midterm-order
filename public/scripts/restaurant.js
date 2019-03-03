// Script for restaurant.ejs
// Creates html structure in restaurant page
function addOrderToRestaurant() {
  let orderBox = `
    <div class="accordion-header">Order #344</div>
    <div class="accordion-content">
      <div class="order-items" class="d-flex justify-content-start order-item">
        
      </div>
      <!--Order total-->
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
      <!--Order total-->
          </div>
      `;
  return $("#orders").append(orderBox);
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
  addOrderToRestaurant();
  addItemsToOrder();

  // Accordion functionality for orders
  $(".accordion").on("click", ".accordion-header", function() {
    $(this)
      .toggleClass("active")
      .next()
      .slideToggle();
  });
});
