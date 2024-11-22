const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  income: {
    type: Number,
    default: 0
  },
  vehicle_info: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;