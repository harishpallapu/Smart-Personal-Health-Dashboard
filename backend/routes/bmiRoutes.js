const express = require('express');
const router = express.Router();
const BMI = require('../models/BMI');

router.post('/', async (req, res) => {
  try {
    const bmiData = await BMI.create(req.body);
    res.status(201).json(bmiData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const data = await BMI.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
