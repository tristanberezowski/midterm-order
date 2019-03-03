"use strict";
const express = require("express");
const router = express.Router();

module.exports = knex => {

  router.get("/:order", (req, res) => {
    knex.from('products')
      .innerJoin('product_orders', 'product_orders.product_id', 'products.id')
      .innerJoin('orders', 'orders.id', 'product_orders.order_id')
      .select("product_orders.quantity", "products.price", "products.name", "products.img", "description")
      .where('orders.id', req.params.order)
      .asCallback(function (err, rows) {
        if (err) {
          console.error("error in get /:order =>", err);
          //return res.render("error", a message or object);
        }
        //console.log("ROWS ARE:", rows);
        res.render("order", {orders: rows});
      })
  })

  router.post("/", (req, res) => {
    console.log(req.body)
    knex("guests")
    .insert({
      name: req.body.fname,
      phone: req.body.lname,
      order_id: Number(req.body.order_id)
    })
    .then((result) => res.status(202).end())
    .catch((err) => console.error("issue with inserting user data"));
  })

  return router;
}