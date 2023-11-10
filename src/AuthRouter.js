import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useToken from "./components/Login/useToken";
import axios from "axios";

export const AuthRouter = () => {
  const { setToken } = useToken();
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (!accessToken) {
      return <Navigate to={"/login"} replace />;
    }

    const fetchData = async () => {
      const config = {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };

      try {
        const response = await axios.get("http://localhost:8088/api/private/auth/refresh-token", config);
        
        if (response.data.message === "verified") {
          setToken(response.data);
        } else {
          return <Navigate to={"/login"} replace />;
        }
      } catch (error) {
        return <Navigate to={"/login"} replace />;
      }
    };

    fetchData();
  }, [accessToken, setToken]);

  return <Outlet />;
};