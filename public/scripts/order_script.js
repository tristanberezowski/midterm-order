$(() => {
  function createOrderElement(product, quantity) {
    let element = `
    <div class="d-flex justify-content-start order-item">
        <div class="row">
          <div class="col-12 col-md-2"><img class="order-item-image" src="${product.img}" /></div>
          <div class="col-12 col-md-6 ">
            <p class="order-item-name">${product.name}</p>
            <div>
              <p class="order-item-description">
              ${product.description}
              </p>
            </div>
          </div>
  <div class="col-12 col-md-2 "><p class="order-item-quantity">Quantity: ${quantity}</p></div>
          <div class="col-12 col-md-2 "><p class="order-item-price">$${product.price * quantity}</p></div>
        </div>
      </div>
    `
    let $element = $(element);
    return $element
  }
  // ----------------------

  //submit user data and display order confirmed asynchronously
  $(".checkout-form").submit(function(event) {
    event.preventDefault();
    let guestInfo = $(".checkout-form").serialize() + `&order_id=${window.location.pathname.replace("/orders/","")}`;
    console.log(guestInfo);
    $.post("/orders", guestInfo).done(() => {
      $("#order-confirmation").css("opacity","1")
      $(".checkout-form button").attr("disabled", true);
      console.log("order placed")
    }).fail(err => {
      console.error("error posting in front end");
    })
  });
});