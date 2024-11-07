import UserSideFooter from "@src/components/footer/Footer";
import { Header } from "@src/components/header";
import React from "react";

function LoginPage() {
  return (
    <div className="bg-primary h-screen">
      <Header />
      <UserSideFooter />
    </div>
  );
}

export default LoginPage;
