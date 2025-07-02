const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  await product.save();
  res.send("Product added");
});

router.get("/", async (req, res) => {
  const search = req.query.search || "";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });
  res.json(products);
});

module.exports = router;
