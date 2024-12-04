import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React, { StrictMode } from "react";
import UserRouter from "./routes/user/UserRouter";
import AdminRouter from "./routes/admin/AdminRouter";
import DriverRoute from "./routes/driver/DriverRoute";
import ChatPage from "../src/pages/Chat/ChatPage";
function App() {
  return (
    <div className="font-priego text-sm md:text-md bg-background min-h-screen">
      <StrictMode>
        <Router>
          <Routes>
            <Route path="/*" element={<UserRouter />} />
            <Route path="/driver/*" element={<DriverRoute />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/chat/:chatId" element={<ChatPage />} /> 
          </Routes>
        </Router>
      </StrictMode>
    </div>
  );
}

export default App;
