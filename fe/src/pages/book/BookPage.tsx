import { Book } from "@src/components/book";
import { Footer } from "@src/components/footer";
import { Header } from "@src/components/header";
import React from "react";

function BookPage() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <Header />
      <div className="flex-1">
        <Book />
      </div>
      <Footer />
    </div>
  );
}

export default BookPage;
