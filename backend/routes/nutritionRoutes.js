const express = require('express');
const Nutrition = require('../models/Nutrition');
const nutritionRouter = express.Router();

nutritionRouter.post('/', async (req, res) => {
  try {
    const nutrition = await Nutrition.create(req.body);
    res.status(201).json(nutrition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

nutritionRouter.get('/:userId', async (req, res) => {
  try {
    const data = await Nutrition.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = nutritionRouter;