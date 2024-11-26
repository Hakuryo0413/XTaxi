const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rideHistorySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ride_id: {
    type: Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },
  driver_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "canceled", "ongoing"],
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: Date,
  fare: {
    type: Number,
    required: true,
  },
  user_rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  driver_feedback: String,
});
const RideHistory = mongoose.model('RideHistory', rideHistorySchema);
module.exports = RideHistory;

