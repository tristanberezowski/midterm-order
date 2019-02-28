"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  // function createProductOrder(orderId, order) {
  //   knex('product_orders').insert({
  //     quantity: order.quantity,
  //     product_id: order.id,
  //     order_id: orderId
  //   });
  // }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("products")
      .orderBy("id")
      .then(products => {
        let templateVars = { items: products };
        res.render("index", templateVars);
      })
      .catch(err => {
        console.error("Failure in getting items from database");
        throw err;
      });
  });

  router.post("/", (req, res) => {
    var newOrder = req.body.order;
    knex("orders")
      .insert(
        {
          time_stamp: knex.fn.now()
        },
        ["id"]
      )
      .then(id => {
        console.log(id);
        createProductOrder(id, newOrder);
      })
      .catch(err => {
        throw err;
      });
  // });

  // router.get("/:order", (req, res) => {
  //   knex.select(users.name, users.phone_number, product_orders.quantity, products.price, products.name, description)
  //       .from('products')
  //       .innerJoin('product_orders','product_orders.product_id','products.id')
  //       .innerJoin('users','users.order_id',req.params.order)
  //       .asCallback(function(err, rows) {
  //         if (err) throw err;

  //         console.log(rows);
  //       })
  // })

  return router;
};
