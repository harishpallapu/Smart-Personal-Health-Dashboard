const express = require('express');
const Workout = require('../models/Workout');
const workoutRouter = express.Router();

workoutRouter.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

workoutRouter.get('/:userId', async (req, res) => {
  try {
    const data = await Workout.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = workoutRouter;