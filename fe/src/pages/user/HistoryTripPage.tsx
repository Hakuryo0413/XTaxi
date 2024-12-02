import { HistoryTrip } from "@src/components/HistoryTrip";
import UserSideFooter from "@src/components/footer/Footer";
import { UserHeader } from "@src/components/header";
import React from "react";

function HistoryTripPage() {
  return (
    <div className="bg-primary h-screen">
      <UserHeader />
      <HistoryTrip />
      <UserSideFooter />
    </div>
  );
}

export default HistoryTripPage;