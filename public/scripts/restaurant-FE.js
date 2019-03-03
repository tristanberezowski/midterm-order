//create order list
const orderFunction1 = function (orderObj) {
  let orderhtml = `
  `;
  let $orderHtml = $(menuHtml);
  return $orderHtml;
};

con orderFunction2 = function (orderObj) {

};


$(() => {

  // Ajax request to create order obj
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
