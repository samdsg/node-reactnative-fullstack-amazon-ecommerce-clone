"use strict";

var express = require("express");

var router = express.Router();

var bcrypt = require("bcryptjs");

var config = require("config");

var jwt = require("jsonwebtoken");
/* User model */


var User = require("../../models/User");

var auth = require("../../middleware/auth");
/** api/auth
 * POST
 * PUBLIC
 */


router.post("/", function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password; // Simple validation

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  } // Check for existing user


  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) return res.status(400).json({
      msg: "User Does not exist"
    }); // Validate password

    bcrypt.compare(password, user.password).then(function (isMatch) {
      if (!isMatch) return res.status(400).json({
        msg: "Invalid credentials"
      });
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
router.get("/user", auth, function (req, res) {
  //* Return user *//
  User.findById(req.amazonUser.id).select("-password").then(function (user) {
    return res.json(user);
  });
});
module.exports = router;