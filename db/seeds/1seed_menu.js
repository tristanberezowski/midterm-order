exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries

        // DO NOT MAKE CHANGES TO FOREIGN KEYS

        knex("products").insert({
          id: 1,
          name: 'Kale Juice',
          description: 'Ingredients: kale, celery, cucumber, parsley, lemon, ginger.',
          price: 3.33,
          img: './images/product1.webp'
        }),
        knex("products").insert({
          id: 2,
          name: "Classic Acai",
          description: 'Fresh açai and assorted berries with banana, honey, granola and almond milk.',
          price: 9.66,
          img: './images/product2.webp'
        }),
        knex("products").insert({
          id: 3,
          name: 'Avocado toast',
          description: 'House-made gluten-free chia flatbread, spiced avocado, pickled onions, sunflower sprouts.',
          price: 4.55,
          img: './images/product3.webp'
        }),
        knex('products').insert({
          id: 4,
          name: 'Cauliflower + Chickpea',
          description: 'Quinoa, roasted cauliflower, chickpeas, tahini and maple dressing topped with sprouts and pickled onions.',
          price: 10.43,
          img: './images/product4.webp'
        }),
        knex('products').insert({
          id: 5,
          name: 'Creamy Nutty',
          description: 'Fresh açai and assorted berries with banana, glory nut butter and cacao nibs.',
          price: 11.95,
          img: './images/product5.webp'
        }),
        knex('products').insert({
          id: 6,
          name: 'Organic Seed Bar',
          description: 'Tahini and coconut oil base blended with a variety of antioxidant berries and raw seeds.',
          price: 3.00,
          img: './images/product6.webp'
        }),
        knex('products').insert({
          id: 7,
          name: 'Turmeric + Ginger',
          description: 'Ingredients: Ginger, turmeric, orange, grapefruit, lime, black pepper, cayenne.',
          price: 2.73,
          img: './images/product7.webp'
        }),
        knex('products').insert({
          id: 8,
          name: 'Sweet Tropical',
          description: 'Fresh açai berries topped with banana, citrus fruits, bee pollen and coconut nectar.',
          price: 11.85,
          img: './images/product8.webp'
        }),
        knex('products').insert({
          id: 9,
          name: 'Carrot Pineapple Orange Lemon Turmeric',
          description: 'carrot, pineapple, orange, lemon, and turmeric.',
          price: 4.98,
          img: './images/product9.webp'
        }),
      ]);
    });
};
