import { LocationDriver } from "@src/components/LocationDriver";
import UserSideFooter from "@src/components/footer/Footer";
import { UserHeader } from "@src/components/header";
import React from "react";

function LocationDriverPage() {
  return (
    <div className="bg-primary h-screen">
      <UserHeader />
      <LocationDriver />
      <UserSideFooter />
    </div>
  );
}

export default LocationDriverPage;