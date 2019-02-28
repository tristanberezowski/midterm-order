exports.up = function (knex, Promise) {
  console.log(process.env);
  return knex.schema.createTable('orders', function (table) {
    table.increments('id');
    table.integer('pick_up_time');
    table.timestamp('time_stamp');

  }).createTable('products', function (table) {
    table.increments('id');
    table.varchar('name');
    table.varchar('description');
    table.float('price');
    table.string('img');

  }).createTable('product_orders', function (table) {
    table.increments('id');
    table.integer('order_id').unsigned().references('orders.id')
    table.integer('product_id').unsigned().references('products.id')
    table.integer('quantity');

  }).createTable('guests', function (table) {
    table.increments('id');
    table.varchar('name');
    table.integer('phone');
    table.integer('order_id').references('id').inTable('orders');

  }).createTable('restaurants', function (table) {
    table.increments('id');
    table.varchar('password');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('orders')
    .dropTable('products')
    .dropTable('product_orders')
    .dropTable('guests')
    .dropTable('restaurants');
};

// table.foreign('order_id').references('orders.id');
// table.foreign('product_id').references('products.id');
// table.foreign('order_id').references('orders.id');
