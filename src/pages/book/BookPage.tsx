import { Book } from "@src/components/book";
import UserSideFooter from "@src/components/footer/Footer";
import { HomeHeader } from "@src/components/home/HomeHeader";
import React from "react";

function BookPage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <HomeHeader />
      <div className="flex-1">
        <Book />
      </div>
      <UserSideFooter />
    </div>
  );
}

export default BookPage;
