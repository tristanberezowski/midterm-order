$(() => {

  $('confirm-order-button-id').on('submit', (event) => {
    event.preventDefault();

    //$post to restaurantRoute
    $.post('/owner')
    //function to adjust order UI on owner page

  });

});
