import { LoginPage, RegisterPage, PaymentPage, HistoryTripPage, LocationDriverPage } from "@src/pages/user";
import LocationMapPage from "@src/pages/user/LocationMapPage";
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
        <Route path="/HistoryTrip" element={<HistoryTripPage />} />
        <Route path="/LocationDriver" element={<LocationDriverPage />} />
        <Route path="/LocationMap" element={<LocationMapPage />} />

      </Routes>
    </div>
  );
}

export default UserRouter;
