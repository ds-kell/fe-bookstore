import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

export const AuthRouter = () => {
  const accessToken = localStorage.getItem("token");
  console.log(accessToken);
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};
