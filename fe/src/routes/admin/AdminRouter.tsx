import { AdminPage } from "@src/pages/admin";
import React from "react";
import { Route, Routes } from "react-router-dom";
function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/manage" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default AdminRouter;
