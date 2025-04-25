const express = require('express');
const router = express.Router();
const HeartRate = require('../models/HeartRate');

router.post('/', async (req, res) => {
  try {
    const hr = await HeartRate.create(req.body);
    res.status(201).json(hr);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const data = await HeartRate.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
