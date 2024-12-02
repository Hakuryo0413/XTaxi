import { DriverProfile } from "@src/components/DriverProfile";
import { DriverHeader } from "@src/components/header";
import HomeFooter from "@src/components/footer/HomeFooter";
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