import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBookFill, BsFillPeopleFill } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import "./navbar.css";

function Navbar() {
  const accessToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token");
  };

  return (
    <div>
      {accessToken === null ? null :
        <div className="menu-bar">
          <nav className="navbar">
            <div className="container">
              <Link to="/home" className="nav-item">
                <span className="shop-name">VaAnh's Bookstore</span>
              </Link>
              <Link to="/book" className="nav-item">
                <BsFillBookFill className="nav-icon" />
                <span className="nav-element">Book</span>
              </Link>
              <Link to="/branch" className="nav-item">
                <BsFillPeopleFill className="nav-icon" />
                <span className="nav-element">Branch</span>
              </Link>
              <Link to="/staff" className="nav-item">
                <BsFillPeopleFill className="nav-icon" />
                <span className="nav-element">Staff</span>
              </Link>
              <Link to="/statistic" className="nav-item">
                <FcStatistics className="nav-icon" />
                <span className="nav-element">Statistic</span>
              </Link>
              <div className="nav-search">
                <form className="form-inline">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search"
                  />
                  <button className="btn btn-primary" type="submit">
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
        </div>}
    </div>
  );
}
export default Navbar;
