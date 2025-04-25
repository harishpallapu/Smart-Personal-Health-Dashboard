const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  userId: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nutrition', NutritionSchema);