import { Home } from "@src/components/home";
import React from "react";
import './HomePage.css'
import { Header } from "@src/components/header";
import HomeFooter from "@src/components/home/HomeFooter/HomeFooter";


function HomePage() {
  return (
    <div className="grid-container flex flex-col bg-primary h-screen">
      <Header />
      <div className="flex-1">
        <Home />
      </div>
      <HomeFooter />
    </div>
  );
}

export default HomePage;
