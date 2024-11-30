const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * @description Get or create a chat between user and driver
 * @route POST /api/chat
 */
router.post('/', chatController.getOrCreateChat);

/**
 * @description Send a message in a chat
 * @route POST /api/chat/message
 */
router.post('/message', chatController.sendMessage);

/**
 * @description Get all messages in a chat
 * @route GET /api/chat/:chat_id/messages
 */
router.get('/:chat_id/messages', chatController.getMessages);

module.exports = router;
