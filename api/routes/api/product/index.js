const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const Product = require("../../../models/productSchema");
const User = require("../../../models/User");

router.post("/", auth, (req, res) => {
  const { title, price, imageUrl, desc, user } = req.body;

  // Product Validation
  if (!title || !price || !imageUrl || !desc) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (!user) return res.status(403).json({ msg: "Request is forbidden" });

  const { email, name: added_by } = user;

  // Check for existing user
  User.findOne({ email }).then((admin) => {
    if (!admin) return res.status(400).json({ msg: "User Does not exist" });

    const newProduct = new Product({
      title,
      price,
      imageUrl: imageUrl.toLowerCase(),
      desc,
      added_by,
      cart: false,
    });

    newProduct.save().then((product) => {
      return res.status(200).json({ ...product, sent: true });
    });
  });
});

router.get("/", auth, (req, res) => {
  Product.find({}, function (err, products) {
    if (products.length > 0) {
      return res.status(200).json(products);
    }
    return res.status(400).json({
      msg: "No products for now",
    });
  });
});

//* Delete Product *//
router.delete("/", auth, (req, res) => {
  const { _id } = req.body;

  Product.findById(_id)
    .then((product) =>
      product.remove().then(() => res.json({ success: true, _id }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

//* Update Product Cart Value *//
router.put("/", auth, (req, res) => {
  const { _id } = req.body;

  Product.findOneAndUpdate(
    { _id },
    { $set: { cart: true } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).json({ msg: JSON.stringify(err) });
      return res.status(200).json(doc);
    }
  );
});

router.put("/clear", auth, (req, res) => {
  Product.updateMany(
    {},
    { cart: false },
    { multi: true, upsert: true },
    (err, products) => {
      console.log(products);
    }
  );
});

module.exports = router;
