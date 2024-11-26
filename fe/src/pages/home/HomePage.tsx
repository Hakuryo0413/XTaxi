import { Home } from "@src/components/home";
import React from "react";
import './HomePage.css'
import { UserHeader } from "@src/components/header";
import HomeFooter from "@src/components/home/HomeFooter/HomeFooter";


function HomePage() {
  return (
    <div className="grid-container flex flex-col bg-primary h-screen">
      <UserHeader />
      <div className="flex-1">
        <Home />
      </div>
      <HomeFooter />
    </div>
  );
}

export default HomePage;
