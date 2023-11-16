import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

import { Button } from "antd";

function PostStaff() {
  const accessToken = localStorage.getItem("token");

  const [listBranches, setListBranches] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get(
            "http://localhost:8088/api/public/branch/all-branch",
            config
          );
          console.log(response.data);
          setListBranches(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, []);

  const branchOptions = listBranches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const roleOptions = [
    { value: "ADMIN", value: "ADMIN" },
    { value: "MANAGER", value: "MANAGER" },
    { value: "STAFF", value: "STAFF" },
  ];

  let config = {};
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    branchId: 1,
    fullName: "",
    address: "",
    dob: new Date().toISOString(),
  });

  const handleChangeUser = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setUserData({
      ...userData,
      branchId: branch ? branch.value : 1,
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setUserData({
      ...userData,
      role: role ? role : "NONE",
    });
  };
  const handleSubmitUser = async () => {
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      // console.log(userData);
      const response = await axios.post(
        "http://localhost:8088/api/public/user/create-user",
        userData,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      width: 330,
      flex: 1,
    }),
  };
  return (
    <div className="">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={userData.username}
              onChange={(e) => handleChangeUser("username", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) => handleChangeUser("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              placeholder="Role"
              value={userData.role}
              onChange={(e) => handleChangeUser("role", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => handleChangeUser("password", e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={userData.fullName}
              onChange={(e) => handleChangeUser("fullName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={userData.address}
              onChange={(e) => handleChangeUser("address", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={userData.dob}
              onChange={(e) => handleChangeUser("dob", e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="select-block">
              <label htmlFor="branchId">Branch</label>
              <Select
                className="select-category"
                value={selectedBranch}
                onChange={(selectedBranch) =>
                  handleBranchSelect(selectedBranch)
                }
                isSearchable
                isClearable
                styles={customStyles}
                options={branchOptions}
              />
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>

        <div className="btn-create-staff">
          <Button className="btn-antd" onClick={handleSubmitUser}>
            Submit User
          </Button>
        </div>
      </div>
    </div>
  );
}
export default PostStaff;
