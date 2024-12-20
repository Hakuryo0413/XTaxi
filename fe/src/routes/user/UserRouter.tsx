import AboutPage from "@src/pages/about/AboutPage";
import BookPage from "@src/pages/book/BookPage";
import HomePage from "@src/pages/home/HomePage";
import CustomercarePage from "@src/pages/customercare/customercarePage";
import {
  LoginPage,
  RegisterPage,
  PaymentPage,
  HistoryTripPage,
  LocationDriverPage,
  UserProfilePage,
  DriverFeedbackPage,
} from "@src/pages/user";
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
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookPage />} />
        <Route path="/book-taxi" element={<BookPage />} />
        <Route path="/get-estimate" element={<BookPage />} />
        <Route path="/HistoryTrip" element={<HistoryTripPage />} />
        <Route path="/LocationDriver" element={<LocationDriverPage />} />
        <Route path="/LocationMap" element={<LocationMapPage />} />
        <Route path="/Profile" element={<UserProfilePage />} />
        <Route path="/DriverFeedback" element={<DriverFeedbackPage />} />
        <Route path="/CustomerCare" element={<CustomercarePage />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
