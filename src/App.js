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
import PagePostPickingOut from "./pages/PagePostPickingOut";
import PagePostPickingIn from "./pages/PagePostPickingIn";
import PagePostProposal from "./pages/PagePostProposal";
import BookPage from "./pages/BookPage";
import AllBook from "./pages/AllBook";
import TabMenuBook from "./pages/TabMenuBook";
import CreateBook from "./pages/CreateBook";
import CreateProposal from "./pages/CreateProposal";

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
        <Route path="/book" element={<TabMenuBook />} />
        <Route path="/book/view-book" element={<AllBook />} />
        <Route path="/book/create-book" element={<CreateBook />} />
        <Route path="/book/create-proposal" element={<CreateProposal />} />
       
        <Route path="/" element={<AuthRouter />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/book/detail/:bookDetailId" element={<BookDetail />} />

        <Route path="/book/picking-out/:bookDetailId" element={<PagePostPickingOut />} />
    
        <Route path="/book/picking-in/:bookDetailId" element={<PagePostPickingIn />} />

        <Route path="/book/create-proposal/:bookDetailId" element={<PagePostProposal />} />


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
