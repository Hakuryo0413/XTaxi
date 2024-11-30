const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rideSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickup_location: {
      address: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    dropoff_location: {
      address: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "in_progress", "completed", "canceled"],
      default: "requested",
    },
    fare: {
      type: Number,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: Date,
    distance: Number,
    user_rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    driver_feedback: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;


//Ques : whwy need 2 things for ride and ride history - same field