import React, { useState, useEffect } from "react";
import { FiSend, FiX } from "react-icons/fi";
import './customersupport.css';  // Đảm bảo đường dẫn đến file CSS đúng

interface CustomerSupportProps {
  supportMessage?: string;
  hotline?: string;
}

interface Message {
  sender: "user" | "hotline";
  text: string;
}

// Danh sách câu hỏi mẫu và câu trả lời tự động
const autoReplies: { [key: string]: string } = {
  "Giờ làm việc của tổng đài là gì?": "Tổng đài làm việc từ 8:00 AM đến 6:00 PM, từ thứ 2 đến thứ 6.",
  "Làm thế nào để đặt taxi?": "Bạn có thể đặt taxi thông qua ứng dụng XTaxi hoặc gọi đến tổng đài 1900-123-456.",
  "Làm sao để hủy chuyến đi?": "Để hủy chuyến đi, bạn chỉ cần vào ứng dụng và chọn hủy chuyến trong phần lịch sử chuyến đi.",
  "Tôi có thể thanh toán bằng cách nào?": "Chúng tôi hỗ trợ các phương thức thanh toán như thẻ tín dụng, chuyển khoản ngân hàng và ví điện tử.",
  "Taxi của tôi đâu rồi?": "Vui lòng cung cấp thông tin chuyến đi và chúng tôi sẽ cập nhật vị trí xe cho bạn.",
  // Thêm các câu hỏi và câu trả lời ở đây
};

const CustomerSupport: React.FC<CustomerSupportProps> = ({
  supportMessage,
  hotline = "1900-123-456",
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<string>("673c03f5b77ab9ce05b33b0f"); // Mã định danh của người hỗ trợ

  // Lấy thông tin user_id từ localStorage (hoặc có thể từ API nếu cần thiết)
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
      // Gửi yêu cầu tạo hoặc nhận cuộc trò chuyện nếu chưa có chatId
      if (!chatId) {
        createOrGetChat(storedUserId, driverId);
      }
    }
  }, [chatId, driverId]);

  const createOrGetChat = async (userId: string, driverId: string) => {
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          driver_id: driverId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Lưu chatId và userId
      setChatId(data.chat._id);
    } catch (error) {
      console.error("Lỗi khi tạo hoặc nhận cuộc trò chuyện:", error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() && chatId && userId) {
      // Thêm tin nhắn của người dùng
      const userMessage: Message = { sender: "user", text: chatInput };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        console.log("Sending message:", chatInput);

        // Kiểm tra nếu câu hỏi có trong danh sách câu hỏi mẫu
        const responseMessage = autoReplies[chatInput.trim()];
        
        if (responseMessage) {
          // Nếu có câu trả lời tự động, trì hoãn phản hồi
          setTimeout(() => {
            const hotlineResponse: Message = {
              sender: "hotline",
              text: responseMessage,
            };
            setMessages((prevMessages) => [...prevMessages, hotlineResponse]);
          }, 2000); // Đặt thời gian trì hoãn là 2 giây (2000ms)
        } else {
          // Gửi yêu cầu tới API để gửi tin nhắn
          const response = await fetch("http://localhost:3000/chat/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId, // Sử dụng chat_id thực tế
              sender_id: userId, // Sử dụng sender_id thực tế
              content: chatInput.trim(),
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // Thêm phản hồi từ tổng đài
          setTimeout(() => {
            const hotlineResponse: Message = {
              sender: "hotline",
              text: data.message || "Cảm ơn bạn đã liên hệ. Tổng đài sẽ phản hồi sớm nhất có thể!",
            };
            setMessages((prevMessages) => [...prevMessages, hotlineResponse]);
          }, 2000); // Đặt thời gian trì hoãn là 2 giây (2000ms)
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi gửi tin nhắn:", error);

        // Thêm thông báo lỗi vào chat
        setTimeout(() => {
          const errorResponse: Message = {
            sender: "hotline",
            text: "Xin lỗi! Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
          };
          setMessages((prevMessages) => [...prevMessages, errorResponse]);
        }, 2000); // Đặt thời gian trì hoãn là 2 giây (2000ms)
      }

      // Reset trường nhập liệu
      setChatInput("");
    }
  };

  return (
    <div className="customer-support">
      <h2>Hỗ trợ khách hàng</h2>
      <p>{supportMessage || "Chúng tôi luôn sẵn sàng giúp bạn!"}</p>
      <div className="contact-info">
        <p>
          <strong>Số tổng đài:</strong> {hotline}
        </p>
        <button className="chat-button" onClick={toggleChat}>
          {isChatOpen ? "Đóng chat" : "Chat trực tuyến"}
        </button>
      </div>
      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>💬 Hỗ trợ trực tuyến</span>
            <button onClick={toggleChat} className="close-button">
              <FiX size={20} />
            </button>
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                <p>
                  <strong>
                    {message.sender === "user" ? "Bạn:" : "Tổng đài:"}
                  </strong>{" "}
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <FiSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;
