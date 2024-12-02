import UserSideFooter from "@src/components/footer/Footer";
import { DriverHeader } from "@src/components/header";
import { HistoryDriver } from "@src/components/HistoryDriver";
import React from "react";

function HistoryDriverPage() {
  return (
    <div className="bg-primary h-screen">
      <DriverHeader />
      <HistoryDriver />
      <UserSideFooter />
    </div>
  );
}

export default HistoryDriverPage;