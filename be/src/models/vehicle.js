const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const vehicleSchema = new Schema({
  driver_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  license_plate: {
    type: String,
    required: true,
    unique: true
  },
  vehicle_type: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  registered_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  }
});
const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;