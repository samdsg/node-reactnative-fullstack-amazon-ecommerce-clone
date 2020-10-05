"use strict";

var config = require("config");

var jwt = require("jsonwebtoken");

function auth(req, res, next) {
  var token = req.header("x-amazon-token"); // Check for token

  if (!token) return res.status(401).json({
    msg: "No token, authorizaton denied"
  });

  try {
    // Verify token
    var decoded = jwt.verify(token, config.get("amazonsecret")); // store Amazon user

    req.amazonUser = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: "Token is not valid"
    });
  }
}

module.exports = auth;