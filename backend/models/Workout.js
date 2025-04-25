const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: String,
  type: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', WorkoutSchema);