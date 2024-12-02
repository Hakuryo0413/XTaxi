import DriverTrip from "@src/components/DriverTrip/DriverTrip";
import UserSideFooter from "@src/components/footer/Footer";
import { DriverHeader } from "@src/components/header";
import React from "react";

function DriverTripPage() {
  return (
    <div className="bg-primary h-screen">
      <DriverHeader />
      <DriverTrip />
      <UserSideFooter />
    </div>
  );
}

export default DriverTripPage;