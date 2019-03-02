"use strict";

const express = require('express');
const router = express.Router();

module.exports = function () {

  router.get("/", (req, res) => {
    if (req.session.owner)
      res.render('restaurant'); //MAYBE REDIRECT
    else
      res.render("index");
  });
  return router;
} //post for owner is in app.js
