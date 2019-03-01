function increaseValue() {
  var value = parseInt(document.getElementsByClassName(".increadse").value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementsByClassName("quantity-input").value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementsByClassName(".decrease").value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  document.getElementsByClassName("quantity-input").value = value;
}
