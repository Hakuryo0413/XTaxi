import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React, { StrictMode } from "react";
import UserRouter from "./routes/user/UserRouter";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import BookPage from "./pages/book/BookPage";
import AdminRouter from "./routes/admin/AdminRouter";

function App() {
  return (
    <div className="font-priego text-sm md:text-md bg-background min-h-screen">
      <StrictMode>
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/booking" element={<BookPage />} />
            <Route path="/book-taxi" element={<BookPage />} />
            <Route path="/get-estimate" element={<BookPage />} />

            <Route path="/*" element={<UserRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
          </Routes>
        </Router>
      </StrictMode>
    </div>
  );
}

export default App;
