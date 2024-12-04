import React from "react";
import { DriverFeedback } from "@src/components/DriverFeedBack";
import UserSideFooter from "@src/components/footer/Footer";
import { UserHeader } from "@src/components/header";

const DriverFeedbackPage: React.FC = () => {
  const handleFeedbackSubmit = (rating: number, feedback: string) => {
    console.log("Xếp hạng:", rating, "Phản hồi:", feedback);
    // Gửi dữ liệu đến server tại đây nếu cần
  };

  return (
    <div className="bg-primary h-screen">
    <UserHeader />
    <div className="driver-feedback-page">
      <DriverFeedback onSubmit={handleFeedbackSubmit} />
    </div>
    <UserSideFooter />
  </div>
  );
};

export default DriverFeedbackPage;
