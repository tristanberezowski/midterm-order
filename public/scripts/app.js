function infoForCart($element) {
const name = $(".card-title", $element).text();
const price = $(".product-price", $element).text();
const quantity = $(".quantity-input", $element).val();
const id = $(".product-id", $element).text();
const totalItem = (Number(quantity) * Number(price));
return { id: id, name: name, price: price, quantity: quantity, total: totalItem };
}

const checkQuantity = function($quantityInput) {
  // Check if quantity is at least 1
  if (Number($quantityInput.val()) < 1) {
    alert("Please add at least 1 item.");
    return false;
  } else {
    return true;
  }
};

// Creates restaurant menu
const createProductMenu = function(product) {
  //returns jquery object
  let menuHtml = `
<article class="p-2">
<div class="card">
  <img class="card-img-top" src="${product.img}"/>
  <div class="card-body">
    <div class="row">
      <div class="col-12 col-md-8"><h5 class="card-title">${product.name}</h5></div>
      <div class="col-12 col-md-4"><h6 class="product-price">${product.price}</h6></div>
      <div class="product-id">${product.id}</div>
    </div>
    <p class="card-text">
      ${product.description}
    </p>
    <div class="decrease quantity-btn" onclick="decreaseValue()" value="Decrease Value">
      <span>-</span>
    </div>
    <input type="number" class="quantity-input" value="0" min="1" step="1" />
    <div class="increase quantity-btn" onclick="increaseValue()" value="Increase Value">
      <span>+</span>
    </div>
    </br>
    </br>
    <button class="add-to-cart-btn">Add to Cart</button>
  </div>
</div>
</article>
`;
  let $menuHtml = $(menuHtml);
  return $menuHtml;
};

function cartTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].total;
  }
  $(".total").text("Total: $" + Number(total).toFixed(2));
}

// Creates html structure in the cart
function addToCart(item) {
  let cartItem = `
  <article class="cart-item">
    <div class="row">
        <div class="col-12 col-md-2 quantity"><b>${item.quantity}</b></div>
        <div class="col-12 col-md-6 item-name"><b>${item.name}</b></div>
        <div class="col-12 col-md-4 item-price">$ ${item.total}</div>
    </div>
    <div class="remove-btn">
      <a href="#">Remove</a>
    </div>
  </article>`;
  return $("#side-bar").append(cartItem);
}

$(() => {
  const cart = [];

  // Event listener to add items to cart
  $("#product-container").on("click", ".add-to-cart-btn", function() {
    const $parent = $(this).parent();
    const cartItem = infoForCart($parent);
    if (checkQuantity($parent.children(".quantity-input"))) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === cartItem.name) var exists = i; //to avoid 0 being falsey
      }
      if (exists !== undefined) {
        //happens when the item has been selected already
        cart[exists].quantity = Number(cartItem.quantity) + Number(cart[exists].quantity);
        $(`.item-name:contains(${cartItem.name})`)
          .prev()
          .text(cart[exists].quantity);
        cart[exists].total += cartItem.quantity * cartItem.price;
        $(`.item-name:contains(${cartItem.name}) ~ .item-price`).text(cart[exists].total.toFixed(2));
        cartTotal(cart);
      } else {
        addToCart(cartItem);
        cart.push(cartItem);
        cartTotal(cart);
      }
      $parent.children(".quantity-input").val("0");
    }
  });

  // Event listener to remove items from cart
  $("#side-bar").on("click", ".remove-btn", function() {
    const $parent = $(this).parent();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === $parent.find(".item-name").text()) cart.splice(i, 1);
    }
    $parent.remove();
    cartTotal(cart);
  });

  //Checkout button doing post request
  $(".checkout-btn").on("click", (event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/",
      data:  {cart}
    }).done(result => {
      window.location.href = `/${result.id}`;
    }).fail(error => {
      alert("error posting or inserting to database");
      console.error(error);
    })
  });
  
  // Ajax request to create products menu
  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/products"
    }).done(products => {
      for (product of products) {
        createProductMenu(product).appendTo("#product-container");
      }
    });
  });
  //closes JQuery function
});
