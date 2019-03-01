function infoForCart($element) {
  const name = $(".card-title", $element).text();
  const price = $(".product-price", $element).text();
  const quantity = $(".quantity-input", $element).val();
  const totalItem = (quantity * price).toFixed(2);
  return { name: name, price: price, quantity: quantity, total: totalItem };
}
