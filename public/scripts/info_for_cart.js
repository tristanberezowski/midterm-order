function infoForCart($element) {
  const name = $(".card-title", $element).text();
  const price = $(".product-price", $element).text();
  const quantity = $(".quantity-input", $element).val();
  const totalItem = quantity * price;
  return { name: name, price: price, quantity: quantity, total: totalItem };
}
