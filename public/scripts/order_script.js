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
        <div class="col-12 col-md-2 "><p class="order-item-price">$${(product.price * product.quantity).toFixed(2)}</p></div>
      </div>
    </div>
  `;
  let $element = $(element);
  return $element;
}

function checkConfirm() {
  $.ajax({
    method: "GET",
    url: `/api/time/${window.location.pathname.replace("/orders/", "")}`
  })
    .done(time => {
      if (time) {
        $(".messageAccepted").show();
        $(".waitingConfirmation").hide();
        return true;
      }
      console.log("WAITING!")
    }) 
}

const escape = function(text) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ----------------------
$(() => {
  //submit user data and display order confirmed asynchronously
  $(".checkout-form").submit(function(event) {
    event.preventDefault();
    let guestInfo = $(".checkout-form").serialize() + `&order_id=${window.location.pathname.replace("/orders/", "")}`;
    $.post("/orders", guestInfo)
      .done(() => {
        $("#order-confirmation").css("opacity", "1");
        $(".checkout-form button").attr("disabled", true);
      })
      .fail(err => {
        console.error("error posting in front end");
      })
      .then(() => { //change the section to show an order confirmation
        $(".checkout-form").css("display","none");
        $(".user-checkout h3").css("display","none");
        let guestName = $(".checkout-form input[name='fname']").val();
        let guestPhone = $(".checkout-form input[name='lname']").val();
        let confirmedMessage = `
        <div class="confirmation-message">
          <article>
            <h5 class="messageAccepted">${guestName}, your order has been accepted, please check you phone for a detailed info.</h5>
            <h4 class="waitingConfirmation">Hi ${guestName}, thanks for ordering from <b>Foody!</b></h4>
            <p class="waitingConfirmation">We will text ${guestPhone} when your order is ready.</p> 
          </article>
          </div>
        `;
        $(confirmedMessage).prependTo(".user-checkout");
      })
  });

  //load all the product orders for the current order
  $.ajax({
    method: "GET",
    url: `/api${window.location.pathname}`
  })
    .done(orderProducts => {
      for (orderProduct of orderProducts) {
        createOrderElement(orderProduct).prependTo("#order-container");
      }
      return orderProducts;
    })
    .fail(error => {
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
			
var numberOfEntries = false;
setInterval(function(){
    $.ajax({
      url: `/api/time/${window.location.pathname.replace("/orders/", "")}`,
      type: 'GET',
    })
    .done(function(data) {
      console.log(data);
      if(data != numberOfEntries){
          $(".messageAccepted").show();
          $(".waitingConfirmation").hide();
          return true;
        numberOfEntries = updatedNumberOfEntries;
      }
    });
  }, 5000);
});