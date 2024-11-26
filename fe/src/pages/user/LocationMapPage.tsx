import { LocationMap } from "@src/components/LocationMap";
import UserSideFooter from "@src/components/footer/Footer";
import { UserHeader } from "@src/components/header";
import HomeFooter from "@src/components/home/HomeFooter/HomeFooter";
import React from "react";

function LocationMapPage() {
  return (
    <div className="bg-primary h-screen">
      <UserHeader />
      <LocationMap />
      <HomeFooter />
    </div>
  );
}

export default LocationMapPage;