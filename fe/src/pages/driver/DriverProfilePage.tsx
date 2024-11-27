import { DriverProfile } from "@src/components/DriverProfile";
import UserSideFooter from "@src/components/footer/Footer";
import { DriverHeader } from "@src/components/header";
import HomeFooter from "@src/components/home/HomeFooter/HomeFooter";
import React from "react";

function DriverProfilePage() {
  return (
    <div className="bg-primary h-screen">
      <DriverHeader />
      <div className="flex-1">
        <DriverProfile />
      </div>
      <HomeFooter />
    </div>
  );
}

export default DriverProfilePage;