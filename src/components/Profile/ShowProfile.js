import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./profile.css";
import { Button } from "antd";

const ShowProfile = ({ profile }) => {
  const [statusEdit, setStatusEdit] = useState(false);
  const [dob, setDob] = useState(
    new Date(profile.dob).toISOString().slice(0, 10)
  );
  const handleEdit = () => {
    setStatusEdit(!statusEdit);
  };
  const handleUpdate = () => {
    profile.dob = dob;
    setStatusEdit(false);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("userToken");
    localStorage.clear("role");
    navigate("/login");

  };

  return (
    <div className="">
      <div className="profile-container">
        <div className="user-profile">
          <h1>User Profile</h1>
          <p className="profile-info">Username: {profile.username}</p>
          <label htmlFor="email" className="label-profile">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={profile.email}
            disabled={!statusEdit}
            className="input-profile"
          />
          <label htmlFor="fullName" className="label-profile">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            value={profile.fullName}
            disabled={!statusEdit}
            className="input-profile"
          />
          <label htmlFor="address" className="label-profile">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={profile.address}
            disabled={!statusEdit}
            className="input-profile"
          />
          <div>
            {statusEdit ? (
              <label htmlFor="dob">Date of Birth:</label>
            ) : (
              <p className="profile-info">
                Date of Birth: {new Date(profile.dob).toDateString()}
              </p>
            )}
            {statusEdit ? (
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={handleDobChange}
              />
            ) : null}
          </div>
        </div>
        <div className="btn-profile">
          <Button className="btn-antd" onClick={handleEdit}>
            {statusEdit ? "Cancel" : "Edit"}
          </Button>
          <Button
            className="btn-antd"
            disabled={!statusEdit}
            onClick={handleUpdate}
            htmlType="submit"
          >
            Save
          </Button>
          <Button className="btn-antd" onClick={logout} htmlType="submit">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
