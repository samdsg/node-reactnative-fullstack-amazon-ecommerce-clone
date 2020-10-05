"use strict";

var express = require("express");

var router = express.Router();

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var config = require("config");
/* User model */


var User = require("../../models/User");
/** api/users
 * POST
 * PUBLIC
 */


router.post("/", function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      name = _req$body.name;
  /** Validate */

  if (!email || !password || !name) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }
  /** Check if user exits */


  User.findOne({
    email: email
  }).then(function (user) {
    if (user) return res.status(400).json({
      msg: "User exists"
    });
    var newUser = new User({
      email: email,
      password: password,
      name: name
    }); //** Create salt & hash

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(function (user) {
          jwt.sign({
            id: user.id
          }, config.get("amazonsecret"), {
            expiresIn: 3600
          }, function (err, token) {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          });
        });
      });
    });
  });
});
module.exports = router;