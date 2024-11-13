import { About } from "@src/components/about";
import UserSideFooter from "@src/components/footer/Footer";
import { HomeHeader } from "@src/components/home/HomeHeader";
import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <HomeHeader />
      <div className="flex-1">
      <About />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default AboutPage;