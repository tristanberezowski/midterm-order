
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('orders').del(),
    knex('product_orders').del(),
    knex('guests').del(),
  ])
    .then(function () {
      return  knex('orders').insert({id: 1}).then( (value) => Promise.all([
         knex('product_orders').insert({id: 1, quantity: 3, product_id: 1, order_id: 1}),
         knex('product_orders').insert({id: 2, quantity: 2, product_id: 2, order_id: 1}),
         knex('guests').insert({id: 1, name: 'Tristan', phone: '6042', order_id: 1})
      ]));
    });
};
