import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const token = sessionStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear("token");
  };

  return (
    <div className='menu-bar'>
      <nav className="navbar">
        <div className="container">
          <Link to="/home" className="navbar-brand">
            <span className="shop-name">VaAnh's Bookstore</span>
          </Link>
          <Link to="/book" className="navbar-brand">
            <span className="nav-element">Book</span>
          </Link>
          <Link to="/proposal" className="navbar-brand">
            <span className="nav-element">Proposal</span>
          </Link>
          <Link to="/staff" className="navbar-brand">
            <span className="nav-element">Staff</span>
          </Link>
          <Link to="/statistic" className="navbar-brand">
            <span className="nav-element">Statistic</span>
          </Link>
          <div className="navbar-search">
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
            <Link to='profile' className="profile-link">
              <span className="profile-circle">
                {username}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>

  );
}
export default Navbar;
