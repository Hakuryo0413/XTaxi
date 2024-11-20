import UserSideFooter from "@src/components/footer/Footer";
import { Home } from "@src/components/home";
import React from "react";
import './HomePage.css'
import { Header } from "@src/components/header";


function HomePage() {
  return (
    <div className="grid-container flex flex-col bg-primary h-screen">
      <Header />
      <div className="flex-1">
        <Home />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default HomePage;
