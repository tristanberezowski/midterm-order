"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {

  function createProductOrder(orderId, order) { //insert single product_order
    knex('product_orders').insert({
      quantity: order.quantity,
      product_id: order.id,
      order_id: orderId
    }).then(() => {}).catch((err) => {throw err});
  }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("products")
      .orderBy("id")
      .then(products => {
        let templateVars = {
          items: products
        };
        res.render("index", templateVars);
      })
      .catch(err => {
        console.error("Failure in getting items from database");
        throw err;
      });
  });

  router.post("/", (req, res) => {
    const newOrder = req.body.order; //for json testing, change to req.body
    knex("orders")
      .insert({
        },
        ["id"] //this will give idInside as the return value to this promise
      )
      .then(idInside => { //idInside is an array containing anonymour objects: [anonymous{id:20}]
        let id = idInside[0].id;
        for(let singleOrder of newOrder) {
          createProductOrder(id, singleOrder);
        }
        res.redirect("/" + id + "/");
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.get("/:order", (req, res) => {
     knex.from('products')
         .innerJoin('product_orders','product_orders.product_id','products.id')
         .innerJoin('orders','orders.id','product_orders.order_id')
         .innerJoin('guests','guests.order_id', 'orders.id')
         .select("guests.name", "guests.phone", "product_orders.quantity", "products.price", "products.name", "description")
         .where('orders.id', req.params.order)
         .asCallback(function(err, rows) {
          if (err) throw err;
          res.render("client", rows);
         })
  })

  return router;
};
