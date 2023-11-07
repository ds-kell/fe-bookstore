import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Branch from "./pages/Branch";
import BookDetail from "./pages/BookDetail";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import useToken from "./components/Login/useToken";
import Profile from "./pages/Profile";
import { AuthRouter } from "./AuthRouter";
import Staff from "./pages/Staff";
import StaffInfo from "./pages/StaffInfo";

function App() {
  const { setToken, tokenStorage, token } = useToken();
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    const config = {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
    };
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Home />} />
        <Route path="/" element={<AuthRouter />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/book/:bookId" element={<BookDetail />} />

        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:userId" element={<StaffInfo />} />

        <Route path="/branch" element={<Branch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default App;
