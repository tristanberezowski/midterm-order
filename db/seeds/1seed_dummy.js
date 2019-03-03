exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries

        // DO NOT MAKE CHANGES TO FOREIGN KEYS

        knex("products").insert({
          id: 1,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 3.33,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 2,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 4.66,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 3,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 7.55,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 4,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 2.43,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 5,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 1.95,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 6,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 0.95,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 7,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 8.73,
          img: "./images/hot_dog.jpg"
        }),
        knex("products").insert({
          id: 8,
          name: "Hot Dog",
          description:
            "A footlong Vienna Beef hot dog, topped with relish, onions, tomatoes, pickle and served on a gourmet poppy seed bun.",
          price: 4.85,
          img: "./images/hot_dog.jpg"
        })
      ]);
    });
};
