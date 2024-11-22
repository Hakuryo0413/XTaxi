import { LoginPage, RegisterPage, PaymentPage } from "@src/pages/user";
import React from "react";
import { Route, Routes } from "react-router-dom";
function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
