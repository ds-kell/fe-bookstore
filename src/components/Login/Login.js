import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Hàm xử lý yêu cầu đăng nhập
export async function loginUser(credentials) {
  try {
    const response = await axios.post(
      "http://localhost:8088/api/public/auth/login",
      credentials
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
}

export default function Login({ setToken }) {
  const navigate = useNavigate();

  // const accessToken = localStorage.getItem("token");

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/");
  //   }
  // }, [accessToken, navigate]);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shouldNavigate, setNavigate] = useState(false);

  // Hàm xử lý khi nhấn nút Đăng nhập
  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      if (response) {
        setToken(response);
        setNavigate(true);
        localStorage.setItem("username", username);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Hàm xử lý điều hướng sau khi đăng nhập thành công
  useEffect(() => {
    if (shouldNavigate) {
      navigate("/home");
      window.location.reload(); 
    }
  }, [shouldNavigate, navigate]);

  return (
    <div className="container">
      <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Đăng nhập</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
