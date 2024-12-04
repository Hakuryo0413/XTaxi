import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // Đảm bảo đây là địa chỉ đúng của backend
});

// Interface cho tin nhắn
export interface Message {
  senderId: string;
  content: string;
}

export const getMessages = async (chatId: string) => {
  try {
    const response = await api.get(`/chat/${chatId}/messages`);
    console.log("Fetched messages:", response.data); // Log kết quả
    return response.data.messages;  // Nếu dữ liệu trả về có trường 'messages'
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
// Gửi tin nhắn vào một cuộc trò chuyện
export const sendMessage = async (chatId: string, userId: string, message: string) => {
  try {
    // Kiểm tra các tham số trước khi gửi
    if (!chatId || !userId || !message) {
      throw new Error('chatId, userId, and message are required.');
    }

    // Debug log cho tham số
    console.log('Sending message:', { chatId, userId, message });

    const response = await api.post('/chat/message', {
      chat_id: chatId,      // Chat ID của cuộc trò chuyện
      sender_id: userId,    // User ID của người gửi
      content: message,     // Nội dung tin nhắn
    });

    // Log kết quả API
    console.log('Message sent successfully:', response.data);

    // Trả về dữ liệu tin nhắn từ response
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    
    // Nếu có lỗi từ server, trả về thông báo lỗi thích hợp
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to send message');
    }
    throw error;
  }
};
