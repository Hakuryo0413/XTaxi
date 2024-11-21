import { About } from "@src/components/about";
import UserSideFooter from "@src/components/footer/Footer";
import { Header } from "@src/components/header";
import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <Header />
      <div className="flex-1">
      <About />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default AboutPage;
