import React, { useState } from "react";
import "./DriverFeedback.css";

interface DriverFeedbackProps {
  onSubmit: (rating: number, feedback: string) => void;
}

const DriverFeedback: React.FC<DriverFeedbackProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === "") {
      alert("Vui lòng chọn xếp hạng và nhập phản hồi trước khi gửi.");
      return;
    }
    onSubmit(rating, feedback);
    alert("Cảm ơn bạn đã đánh giá!");
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="driver-feedback">
      <h2>Đánh giá tài xế</h2>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "selected" : ""}`}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="feedback-input"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Nhập phản hồi của bạn tại đây..."
      />
      <button className="submit-button" onClick={handleSubmit}>
        Gửi đánh giá
      </button>
    </div>
  );
};

export default DriverFeedback;
