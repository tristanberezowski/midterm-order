exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries

        // DO NOT MAKE CHANGES TO FOREIGN KEYS

        knex('products').insert({

          name: 'hot dog',
          description: 'costco',
          price: '3.33'
        }),
        knex('orders').insert({

          time_stamp: '2008-02-25 17:23:10.111189-08'
        }),
        knex('product_orders').insert({

          quantity: '4'
        })
      ]);
    });
};
