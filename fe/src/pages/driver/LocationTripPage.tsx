import { LocationTrip } from "@src/components/LocationTrip";
import { DriverHeader } from "@src/components/header";
import HomeFooter from "@src/components/home/HomeFooter/HomeFooter";
import React from "react";

function LocationTripPage() {
  return (
    <div className="bg-primary h-screen">
      <DriverHeader />
      <LocationTrip />
      <HomeFooter />
    </div>
  );
}

export default LocationTripPage;