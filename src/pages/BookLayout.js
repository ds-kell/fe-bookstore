// BookLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import TabMenuBook from "./TabMenuBook";

const BookLayout = () => {
  return (
    <div className="body">
      <TabMenuBook />
    </div>
  );
};

export default BookLayout;
