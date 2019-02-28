exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('products').insert({
          id: 1,
          name: 'hot_dog',
          description: 'costco',
          price: '3.99'
        }),
        knex('orders').insert({
          id: 1,
          time_stamp: '2001-02-16 20:38:40'
        }),
        knex('product_orders').insert({
          id: 1,
          order_id: '1',
          product_id: '1',
          quantity: '4'
        })
      ]);
    });
};


// }).createTable('products', function (table) {
//   table.increments('id');
//   table.varchar('name');
//   table.varchar('description');
//   table.float('price');
//   table.string('img');

// sample code from users.js
// exports.seed = function(knex, Promise) {
//   return knex('users').del()
//     .then(function () {
//       return Promise.all([
//         knex('users').insert({id: 1, name: 'Alice'}),
//         knex('users').insert({id: 2, name: 'Bob'}),
//         knex('users').insert({id: 3, name: 'Charlie'})
//       ]);
//     });
// };
