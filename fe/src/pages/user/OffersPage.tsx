import { Offers } from "@src/components/Payment";
import UserSideFooter from "@src/components/footer/Footer";
import { Header } from "@src/components/header";
import React from "react";

function OffersPage() {
  return (
    <div className="bg-primary h-screen">
      <Header />
      <Offers />
      <UserSideFooter />
    </div>
  );
}

export default OffersPage;
