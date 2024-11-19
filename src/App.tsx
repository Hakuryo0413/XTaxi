import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import UserRouter from "./routes/user/UserRouter";
import AdminRouter from "./routes/admin/AdminRouter";

function App() {
  return (
    <div className="font-priego text-sm md:text-md bg-background min-h-screen">
      <Router>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
