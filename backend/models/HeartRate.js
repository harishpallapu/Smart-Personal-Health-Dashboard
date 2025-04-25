import mongoose from 'mongoose';

const heartRateSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  bpm: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('HeartRate', heartRateSchema);
