import UserSideFooter from "@src/components/footer/Footer";
import { Home } from "@src/components/home";
import { HomeHeader } from "@src/components/home/HomeHeader";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <HomeHeader />
      <div className="flex-grow">
        <Home />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default HomePage;
