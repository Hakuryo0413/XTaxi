import { Book } from "@src/components/book";
import { Header } from "@src/components/header";
import HomeFooter from "@src/components/home/HomeFooter/HomeFooter";
import React from "react";

function BookPage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <Header />
      <div className="flex-1">
        <Book />
      </div>
      <HomeFooter />
    </div>
  );
}

export default BookPage;