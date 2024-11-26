import { RegisterForm } from "@src/components/Register";
import UserSideFooter from "@src/components/footer/Footer";
import { Header } from "@src/components/header";
import React from "react";

function RegisterPage() {
  return (
    <div className="bg-primary h-screen">
      <Header />
      <RegisterForm />
      <UserSideFooter />
    </div>
  );
}

export default RegisterPage;