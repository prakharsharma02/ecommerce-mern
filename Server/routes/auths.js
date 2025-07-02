const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = []; // Temporary storage

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashedPass });
  res.send("User Registered");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).send("User not found");

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid Credentials");

  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
