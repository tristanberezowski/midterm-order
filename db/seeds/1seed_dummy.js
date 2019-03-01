exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries

        // DO NOT MAKE CHANGES TO FOREIGN KEYS

        knex('products').insert({
          id: 1,
          name: 'hot dog',
          description: 'textTEXTtextTEXT',
          price: 3.33,
          img: './images/hot_dog.jpg'
        }),
        knex('products').insert({
          id: 2,
          name: 'burger',
          description: 'mcd',
          price: 4.66,
          img: './images/hot_dog.jpg'
        }),
        knex('products').insert({
          id: 3,
          name: 'pizza',
          description: 'textTEXTtextTEXTtextTEXTtextTEX',
          price: 7.55,
          img: './images/refresh.png'
        }),
        knex('products').insert({
          id: 4,
          name: 'taco',
          description: 'textTEXTtextTEXTtextTEXTtextTEXTteTEXTtextTEXTtextTEXTtextTEXTtXTtextTEXTtextTEXTtextTEXTtextTEXTtex',
          price: 2.43,
          img: './images/refresh.png'
        }),
        knex('products').insert({
          id: 5,
          name: 'fries',
          description: 'textTEXTtextTEXTtextxtTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXT',
          price: 1.95,
          img: './images/hot_dog.jpg'
        }),
        knex('products').insert({
          id: 6,
          name: 'soda',
          description: 'textTEXTtextTEXTtexTtetTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXTtextTEXT',
          price: 0.95,
          img: './images/hot_dog.jpg'
        }),
        knex('products').insert({
          id: 7,
          name: 'ramen',
          description: 'shio',
          price: 8.73,
          img: './images/hot_dog.jpg'
        }),
        knex('products').insert({
          id: 8,
          name: 'gyoza',
          description: 'pork',
          price: 4.85,
          img: './images/hot_dog.jpg'
        }),
        knex('products').insert({
          id: 9,
          name: 'rice',
          description: 'fried',
          price: 6.98,
          img: './images/hot_dog.jpg'
        }),
      ]);
    });
};
