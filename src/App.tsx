import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import UserRouter from "./routes/user/UserRouter";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import BookPage from "./pages/book/BookPage";

function App() {
  return (
    <div className="font-priego text-sm md:text-md bg-background min-h-screen">
      <Router>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booking" element={<BookPage />} />
          <Route path="/book-taxi" element={<BookPage />} />
          <Route path="/get-estimate" element={<BookPage />} />

          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
