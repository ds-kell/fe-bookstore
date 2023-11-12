import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useToken from "./components/Login/useToken";
import axios from "axios";

export const AuthRouter = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) {
        navigate("/login", { replace: true });
        return;
      }

      const config = {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };

      try {
        const response = await axios.get("http://localhost:8088/api/private/auth/refresh-token", config);
        if (response.data.message === "verified") {
          setToken(response.data);
        } else {
          navigate("/login", { replace: true });
          return;
        }
      } catch (error) {
        navigate("/login", { replace: true });
        return;
      }
    };

    fetchData();
  }, [accessToken, setToken, navigate]);
  return <Outlet />;
};
