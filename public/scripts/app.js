$(() => {
  $.ajax({
    method: "GET",
    url: "/api/products"
  }).done((products) => {
    for(product of products) {
      $("<h1>").text(product.name).appendTo($("body"));
    }
  });;
});

$(document).ready(function() {
  const menu = {
    item1: {
      id: "100",
      name: "Hot Dog",
      description: "gourmet sandwich",
      price: "$3,99"
    },
    item2: {
      id: "200",
      name: "Hamburguer",
      description: "Double Cheese",
      price: "$7,99"
    }
  };

  function createOrderItem(menu) {}
}); //closes jquery function
