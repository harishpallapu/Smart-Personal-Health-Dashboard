const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
  userId: String,
  hours: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sleep', SleepSchema);