const mongoose = require('mongoose');

const WaterSchema = new mongoose.Schema({
  userId: String,
  liters: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Water', WaterSchema);