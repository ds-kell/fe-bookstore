import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBookFill, BsFillPeopleFill } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import { Button } from "antd";
import "./navbar.css";

function Navbar() {
  const accessToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const isManager = role === "MANAGER";

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token");
  };

  return (
    <div>
      {accessToken === null ? null : (
        <div className="menu-bar">
          <nav className="navbar">
            <div className="container">
              <Link to="/home" className="nav-item">
                <span className="shop-name">VaAnh's Bookstore</span>
              </Link>
              <Link to="/book/view-book" className="nav-item">
                <BsFillBookFill className="nav-icon" />
                <span className="nav-element">Book</span>
              </Link>
              <div>
                {(isAdmin || isManager) && (
                  <Link to="/staff" className="nav-item">
                    <BsFillPeopleFill className="nav-icon" />
                    <span className="nav-element">Staff</span>
                  </Link>
                )}
              </div>
              <div>
                {(isAdmin || isManager) && (
                  <Link to="/branch" className="nav-item">
                    <BsFillPeopleFill className="nav-icon" />
                    <span className="nav-element">Branch</span>
                  </Link>
                )}
              </div>
              <div>
                {(isAdmin || isManager) && (
                  <Link to="/statistic" className="nav-item">
                    <FcStatistics className="nav-icon" />
                    <span className="nav-element">Statistic</span>
                  </Link>
                )}
              </div>
              <div className="nav-search">
                <form className="form-inline">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search"
                  />
                  <button className="btn-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div>
                <Link to="profile" className="profile-link">
                  <span className="profile-circle">{username}</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
export default Navbar;
