import LoginPage from "@src/pages/user/LoginPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
