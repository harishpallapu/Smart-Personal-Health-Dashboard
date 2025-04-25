const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne(req.body);
  user ? res.send(user) : res.status(401).send("Invalid login");
});

module.exports = router;
