import UserSideFooter from "@src/components/footer/Footer";
import { Home } from "@src/components/home";
import { HomeHeader } from "@src/components/home/HomeHeader";
import React from "react";
import './HomePage.css'


function HomePage() {
  return (
    <div className="grid-container flex flex-col bg-primary h-screen">
      <HomeHeader />
      <div className="flex-1">
        <Home />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default HomePage;
