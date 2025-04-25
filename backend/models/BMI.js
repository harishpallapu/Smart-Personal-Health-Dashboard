const mongoose = require('mongoose');

const BMISchema = new mongoose.Schema({
  userId: String,
  height: Number,
  weight: Number,
  bmi: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BMI', BMISchema);