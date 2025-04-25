const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');

router.post('/', async (req, res) => {
  try {
    const sleep = await Sleep.create(req.body);
    res.status(201).json(sleep);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const data = await Sleep.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;