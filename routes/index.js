"use strict";

const express = require("express");
const router = express.Router();


module.exports = knex => {

  function createProductOrder(orderId, order) {
    return knex('product_orders').insert({
      quantity: order.quantity,
      product_id: order.id,
      order_id: orderId
    }) //.then( (result) => {console.log("successful insert on", order )})
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
    const newOrder = req.body.cart;
    knex("orders")
      .insert({},
        ["id"] //this will give idInside as the return value to this promise
      )
      .then(idInside => {
        //idInside is an array containing anonymour objects: [anonymous{id:20}]
        let id = idInside[0].id;
        let promises = newOrder.map((singleOrder) => createProductOrder(id, singleOrder));
        // for (let singleOrder of newOrder) {  //these are unneeded because of line above
        //   createProductOrder(id, singleOrder);
        // }
        return Promise.all(promises).then((results) => id); //id needs to stay in scope
        //if all succeed, go to then otherwise it'll bubble down to catch
      })
      .then(id => res.status(201).json({
        id: id
      }))
      .catch(errs => {
        console.error(errs);
        res.status(500).json({
          message: "posting failed while trying to insert",
          errorMessage: errs.message
        });
      });
  });

  router.get("/:order", (req, res) => {
    knex.from('products')
      .innerJoin('product_orders', 'product_orders.product_id', 'products.id')
      .innerJoin('orders', 'orders.id', 'product_orders.order_id')
      .select("product_orders.quantity", "products.price", "products.name", "products.img", "description")
      .where('orders.id', req.params.order)
      .asCallback(function (err, rows) {
        if (err) {
          console.error(err)
          //return res.render("error", a message or object);
        }
        console.log("rows", rows);
        res.render("order", {
          rows
        });
      })
  })

  return router;
};
