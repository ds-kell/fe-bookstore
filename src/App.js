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
import AllBook from "./pages/AllBook";
import BookLayout from "./pages/BookLayout";
import PagePostBook from "./pages/PagePostBook";
import Category from "./pages/Category";
import PageMultiPostPickingOut from "./pages/PageMultiPostPickingOut";
import PageMultiPostProposal from "./pages/PageMultiPostProposal";
import PageMultiPostPickingIn from "./pages/PageMultiPostPickingIn";
import PagePostStaff from "./pages/PagePostStaff";
import PageExpense from "./pages/PageExpense";
import StatisticLayout from "./pages/StatisticLayout";

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
        <Route path="/" element={<AuthRouter />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/home" element={<Home />} />

        <Route path="/book/*" element={<BookLayout />}>
          <Route path="view-book" element={<AllBook />} />
          <Route path="create-book" element={<PagePostBook />} />
          <Route path="create-proposal" element={<PageMultiPostProposal />} />
          <Route path="category" element={<Category />} />
          <Route path="picking-out" element={<PageMultiPostPickingOut />} />
          <Route path="picking-in" element={<PageMultiPostPickingIn />} />
        </Route>


        <Route path="/book/detail/:bookDetailId" element={<BookDetail />} />

        <Route
          path="/book/picking-out/:bookDetailId"
          element={<PagePostPickingOut />}
        />

        <Route
          path="/book/picking-in/:bookDetailId"
          element={<PagePostPickingIn />}
        />

        <Route
          path="/book/create-proposal/:bookDetailId"
          element={<PagePostProposal />}
        />

        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/create-staff" element={<PagePostStaff />} />
        <Route path="/staff/:userId" element={<StaffInfo />} />

        <Route path="/branch" element={<Branch />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/statistic/*" element={<StatisticLayout/>}>
          <Route path="expense" element={<PageExpense />} />

        </Route>

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default App;
