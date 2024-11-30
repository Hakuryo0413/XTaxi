exports.getOrCreateChat = async (req, res) => {
    try {
        const { user_id, driver_id } = req.body;

        if (!user_id || !driver_id) {
            return res.status(400).json({
                success: false,
                message: "user_id and driver_id are required."
            });
        }

        // Check if a chat already exists between the user and driver
        let chat = await Chat.findOne({ user_id, driver_id }).populate('last_message');
        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = new Chat({ user_id, driver_id });
            await chat.save();
        }

        res.status(200).json({
            success: true,
            chat
        });
    } catch (error) {
        console.error("Error creating or retrieving chat:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { chat_id, sender_id, content } = req.body;

        if (!chat_id || !sender_id || !content) {
            return res.status(400).json({
                success: false,
                message: "chat_id, sender_id, and content are required."
            });
        }

        // Create a new message
        const message = new Message({ chat_id, sender_id, content });
        await message.save();

        // Update the last message in the chat
        await Chat.findByIdAndUpdate(chat_id, { last_message: message._id });

        res.status(200).json({
            success: true,
            message: "Message sent successfully.",
            data: message
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

exports.getMessages = async (req, res) => {
    try {
      const { chat_id } = req.params;
  
      if (!chat_id) {
        return res.status(400).json({
          success: false,
          message: "chat_id is required."
        });
      }
  
      // Fetch all messages for a chat
      const messages = await Message.find({ chat_id }).sort({ created_at: 1 });
  
      res.status(200).json({
        success: true,
        messages
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error."
      });
    }
  };
  