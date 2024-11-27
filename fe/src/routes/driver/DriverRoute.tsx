import AboutPage from "@src/pages/about/AboutPage";
import DriverProfilePage from "@src/pages/driver/DriverProfilePage";
import DriverTripPage from "@src/pages/driver/DriverTripPage";
import LocationTripPage from "@src/pages/driver/LocationTripPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
function DriverRoute() {
  return (
    <div>
      <Routes>
            <Route path="/DriverTrip" element={<DriverTripPage />} />
            <Route path="/DriverAbout" element={<AboutPage />} />
            <Route path="/locationTrip" element={<LocationTripPage />} />
            <Route path="/DriverProfile" element={<DriverProfilePage />} />
      </Routes>
    </div>
  );
}

export default DriverRoute;
// <Route path="/manage" element={<AdminPage />} />
