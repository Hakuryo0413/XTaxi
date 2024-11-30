const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Message Schema
const messageSchema = new Schema({
  chat_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
