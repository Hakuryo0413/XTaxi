import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Message, getMessages, sendMessage } from "../../services/chatService"; 
import { Input, Button, message as AntMessage } from "antd";
import { UserHeader } from "@src/components/header";
import { HomeFooter } from "@src/components/footer";
import "./Chatpagecss.css";

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>(); // Lấy chatId từ URL
  const [messages, setMessages] = useState<Message[]>([]); // Lưu trữ tin nhắn
  const [newMessage, setNewMessage] = useState<string>(''); // Lưu tin nhắn mới

  // Lấy dữ liệu tin nhắn khi component mount
  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        console.log("Chat ID:", chatId);  // Log chatId
        if (chatId) {
          const fetchedMessages = await getMessages(chatId);
          console.log("Fetched messages:", fetchedMessages);  // Log tin nhắn đã lấy
          setMessages(fetchedMessages);  // Cập nhật state với dữ liệu nhận được
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessagesData();
  }, [chatId]);  
  
  // Gửi tin nhắn
  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      AntMessage.warning('Message cannot be empty');
      return; // Dừng hàm nếu tin nhắn trống
    }
  
    try {
      const userId = localStorage.getItem('user_id'); // Lấy user_id từ localStorage
      if (!userId || !chatId) {
        AntMessage.warning('User ID or Chat ID is missing');
        return; // Dừng nếu thiếu user_id hoặc chatId
      }
  
      // Gửi tin nhắn qua API
      const response = await sendMessage(chatId, userId, newMessage);
      if (response.success) {
        // Nếu gửi tin nhắn thành công, cập nhật lại danh sách tin nhắn
        setMessages((prevMessages) => [
          ...prevMessages, 
          { senderId: userId, content: newMessage }
        ]);
        setNewMessage(''); // Xóa nội dung tin nhắn sau khi gửi
        AntMessage.success('Message sent successfully'); // Hiển thị thông báo thành công
      } else {
        // Nếu API trả về lỗi hoặc thông báo thất bại
        AntMessage.error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Hiển thị thông báo lỗi từ backend nếu có
      AntMessage.error('An error occurred while sending the message');
    }
  };

  return (
    <div className="grid-container flex flex-col bg-primary h-screen" style={{ width: '100%' }}>
      <UserHeader /> {/* Thêm header */}
      
      <div className="chat-page-container" style={{ padding: '20px', width: '100%', flex: '1' }}>
        <div className="chat-header" style={{ marginBottom: '20px' }}>
          <h2>Chat with Driver</h2>
        </div>

        <div
          className="messages"
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            height: '300px',
            overflowY: 'scroll',
            width: '100%', // Đảm bảo khung chat chiếm 100% chiều rộng
            maxWidth: '800px', // Giới hạn chiều rộng tối đa cho khung chat
            margin: '0 auto', // Căn giữa khung chat
          }}
        >
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.senderId === localStorage.getItem('user_id') ? 'sent' : 'received'
                }`}
              >
                <p>
                  <strong>
                    {message.senderId === localStorage.getItem('user_id')
                      ? 'You'  // Người gửi là user thì hiển thị 'You'
                      : 'Driver'} {/* Người gửi là driver thì hiển thị 'Driver' */}
                    :
                  </strong>{' '}
                  {message.content}
                </p>
              </div>
            ))
          ) : (
            <p>No messages available</p> // Hiển thị khi không có tin nhắn
          )}
        </div>

        <div className="message-input" style={{ marginTop: '20px' }}>
          <Input.TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={4}
            placeholder="Type a message..."
          />
          <Button
            type="primary"
            onClick={handleSendMessage}
            style={{ marginTop: '10px' }}
          >
            Send
          </Button>
        </div>
      </div>

      <HomeFooter /> {/* Thêm footer */}
    </div>
  );
};

export default ChatPage;
