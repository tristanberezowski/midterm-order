exports.up = function (knex, Promise) {
  console.log(process.env);
  return knex.schema
    .createTable('orders', function (table) {
      table.increments('id');
      table.integer('pick_up_time');
      table.timestamp('time_stamp').defaultTo(knex.fn.now());
      table.boolean('pending');

    }).createTable('products', function (table) {
      table.increments('id');
      table.varchar('name');
      table.varchar('description');
      table.float('price');
      table.string('img');

    }).createTable('product_orders', function (table) {
      table.increments('id');
      table.integer('order_id').references('orders.id').onDelete('CASCADE');
      table.integer('product_id').references('products.id').onDelete('CASCADE');
      table.integer('quantity');

    }).createTable('guests', function (table) {
      table.increments('id');
      table.varchar('name');
      table.varchar('phone');
      table.integer('order_id').references('orders.id').onDelete('CASCADE');

    }).createTable('restaurants', function (table) {
      table.increments('id');
      table.varchar('password');
    });
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE products CASCADE'),
    knex.raw('DROP TABLE product_orders CASCADE'),
    knex.raw('DROP TABLE guests CASCADE'),
    knex.raw('DROP TABLE restaurants CASCADE'),
    knex.raw('DROP TABLE orders CASCADE'),

  ])


};
