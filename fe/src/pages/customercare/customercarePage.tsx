import { CustomerSupport } from "@src/components/customercare";
import UserSideFooter from "@src/components/footer/Footer";
import { Header } from "@src/components/header";
import React from "react";

function CustomercarePage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <CustomerSupport
          supportMessage="Chào mừng bạn đến với dịch vụ hỗ trợ khách hàng của chúng tôi!"
          hotline="1900-654-321"
        />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default CustomercarePage;
