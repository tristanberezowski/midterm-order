module.exports = function($element){
  let name = $("$element .card-title").text();
  let price = $("$element .product-price").text();
  let quantity = $("$element .quantity").text();
  let totalItem = quantity * price;
  return {name: name, price: price, quantity: quantity, total: totalItem};
};