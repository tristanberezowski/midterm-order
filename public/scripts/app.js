function infoForCart($element) {
const name = $(".card-title", $element).text();
const price = $(".product-price", $element).text();
const quantity = $(".quantity-input", $element).val();
const totalItem = (Number(quantity) * Number(price));
return { name: name, price: price, quantity: quantity, total: totalItem };
}

const checkQuantity = function(cartItem, $quantityInput) {
// Check if quantity is at least 1
if (Number($quantityInput.val()) < 1) {
  alert("Please add at least 1 item.");
} else {
  addToCart(cartItem);
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
  console.log(cart);
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].total;
  }
  $('.total').text('Total: $' + Number(total).toFixed(2));
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
    console.log("cI",cartItem);
    console.log("cart",cart)
    cart.push(cartItem);
    checkQuantity(cartItem, $parent.children(".quantity-input"));
    console.log("cart",cart);
    cartTotal(cart);
  });

  // Event listener to remove items from cart
  $("#side-bar").on("click", ".remove-btn", function() {
    const $parent = $(this).parent();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === $parent.find(".item-name").text())
        cart.splice(i, 1);
    }
    $parent.remove();
    cartTotal(cart);
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
