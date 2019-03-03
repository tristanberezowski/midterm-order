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
  $(".checkout-form").submit(function(event) {
    event.preventDefault();
    let guestInfo = $(".checkout-form").serialize;
    $.ajax({
      type: "POST",
      url: "/orders",
      data: guestInfo
    }).done(result => {
      $("#order-confirmation").css("opacity", 1); //must be changed to 0 later
    }).fail(err => {
      console.error("error posting in front end");
    })
  });
});