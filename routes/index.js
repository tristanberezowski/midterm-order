"use strict";

const express = require("express");
const router = express.Router();


module.exports = knex => {

  function createProductOrder(orderId, order) {
    return knex('product_orders').insert({
      quantity: order.quantity,
      product_id: order.id,
      order_id: orderId
    })//.then( (result) => {console.log("successful insert on", order )})
  }

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/", (req, res) => {
    const newOrder = req.body.cart;
    knex("orders")
      .insert({pick_up_time: 0},
        ["id"] //this will give idInside as the return value to this promise
      )
      .then(idInside => {
        //idInside is an array containing anonymour objects: [anonymous{id:20}]
        let id = idInside[0].id;
        let promises = newOrder.map((singleOrder) => createProductOrder(id, singleOrder));
        // for (let singleOrder of newOrder) {  //these are unneeded because of line above
        //   createProductOrder(id, singleOrder);
        // }
        return Promise.all(promises).then((results) => id);  //id needs to stay in scope
        //if all succeed, go to then otherwise it'll bubble down to catch
      })
      .then(id => res.status(201).json({id: id}))
      .catch(errs => {
        console.error(errs);
        res.status(500).json({message: "posting failed while trying to insert", errorMessage: errs.message});
      });
  });

  return router;
};
