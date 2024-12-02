import UserProfile from "@src/components/UserProfile/UserProfile";
import { UserHeader } from "@src/components/header";
import HomeFooter from "@src/components/footer/HomeFooter";
import React from "react";

function UserProfilePage() {
  return (
    <div className="bg-primary h-screen">
      <UserHeader />
      <UserProfile />
      <HomeFooter />
    </div>
  );
}

export default UserProfilePage;