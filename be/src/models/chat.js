const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chatSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    driver_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    last_message: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  
  const Chat = mongoose.model('Chat', chatSchema);
  module.exports = Chat;
  