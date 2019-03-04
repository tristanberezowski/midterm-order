function createOrderElement(product) {
  let element = `
  <div class="d-flex justify-content-start order-item">
      <div class="row">
        <div class="col-12 col-md-2"><img class="order-item-image" src="../${product.img}" /></div>
        <div class="col-12 col-md-6 ">
          <p class="order-item-name">${product.name}</p>
          <div>
            <p class="order-item-description">
            ${product.description}
            </p>
          </div>
        </div>
<div class="col-12 col-md-2 "><p class="order-item-quantity">Quantity: ${product.quantity}</p></div>
        <div class="col-12 col-md-2 "><p class="order-item-price">$${product.price * product.quantity}</p></div>
      </div>
    </div>
  `
  let $element = $(element);
  return $element
}
  // ----------------------
$(() => {
  //submit user data and display order confirmed asynchronously
  $(".checkout-form").submit(function(event) {
    event.preventDefault();
    let guestInfo = $(".checkout-form").serialize() + `&order_id=${window.location.pathname.replace("/orders/","")}`;
    $.post("/orders", guestInfo).done(() => {
      $("#order-confirmation").css("opacity","1")
      $(".checkout-form button").attr("disabled", true);
      console.log("order placed")
    }).fail(err => {
      console.error("error posting in front end");
    })
  });
  $.ajax({
    method: "GET",
    url: `/api${window.location.pathname}`
  }).done(orderProducts => {
    console.log(orderProducts)
    for (orderProduct of orderProducts) {
      createOrderElement(orderProduct).prependTo("#order-container");
    }
    return orderProducts;
  }).fail(error => {
    console.error("error loading products");
  })
    .then((orderProducts) => {//change the total display
    //set all the totals
    $(".price").text(() => {
      let total = 0;
      for (let orderProduct of orderProducts) {
        total += Number(orderProduct.price) * Number(orderProduct.quantity);
      }
      $(".taxes").text("$" + (total * .05).toFixed(2));
      $("<span>Taxes: </span>").prependTo(".taxes");
      $(".final-price").text("$" + (total * .05 + total).toFixed(2));
      
      return "$" + total.toFixed(2);
    })
  })
    .then(() => $("<span>Sub-Total: </span>").prependTo(".price"));

  
});