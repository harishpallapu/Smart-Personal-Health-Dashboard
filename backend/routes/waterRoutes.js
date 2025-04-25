const express = require('express');
const router = express.Router();
const Water = require('../models/WaterIntake');

router.post('/', async (req, res) => {
  try {
    const data = await Water.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const data = await Water.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
