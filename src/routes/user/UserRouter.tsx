import { LoginPage, RegisterPage } from "@src/pages/user";
import React from "react";
import { Route, Routes } from "react-router-dom";
function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
