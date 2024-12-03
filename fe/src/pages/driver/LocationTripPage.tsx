import { LocationTrip } from "@src/components/LocationTrip";
import { DriverHeader } from "@src/components/header";
import HomeFooter from "@src/components/footer/HomeFooter";
import React from "react";

function LocationTripPage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <DriverHeader />
      <LocationTrip />
      <HomeFooter />
    </div>
  );
}

export default LocationTripPage;
