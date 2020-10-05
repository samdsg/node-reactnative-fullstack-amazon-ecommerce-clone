const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/* User model */
const User = require("../../models/User");

/** api/users
 * POST
 * PUBLIC
 */
router.post("/", (req, res) => {
  const { email, password, name } = req.body;

  /** Validate */
  if (!email || !password || !name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  /** Check if user exits */
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User exists" });

    const newUser = new User({
      email,
      password,
      name,
    });

    //** Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("amazonsecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
