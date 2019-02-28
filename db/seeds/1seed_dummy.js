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
          price: 3.33,
          img: './images/flag.png'
        }),
        knex('products').insert({

          name: 'burger',
          description: 'mcd',
          price: 4.66,
          img: './images/heart.png'
        }),
        knex('products').insert({

          name: 'pizza',
          description: 'hut',
          price: 7.55,
          img: './images/refresh.png'
        })
      ]);
    });
};
