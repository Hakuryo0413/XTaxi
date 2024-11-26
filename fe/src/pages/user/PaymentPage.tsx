import { Payment } from "@src/components/Payment";
import UserSideFooter from "@src/components/footer/Footer";
import { Header } from "@src/components/header";
import React from "react";

function PaymentPage() {
  return (
    <div className="bg-primary h-screen">
      <Header />
      <Payment />
      <UserSideFooter />
    </div>
  );
}

export default PaymentPage;
