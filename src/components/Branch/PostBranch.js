import React, { useState, useEffect } from "react";
import axios from "axios";
import "./branch.css";
import { Button } from "antd";
import CustomModal from '../CustomModal'
import Select from "react-select";


function PostBranch() {
  const accessToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const isManager = role === "MANAGER";
  let config = {};

  const [branchRequest, setBranchRequest] = useState({
    name: "",
    address: "",
  });

  const handleChange = (field, value) => {
    setBranchRequest({
      ...branchRequest,
      [field]: value,
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responeMessage, setResponseMessage] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async () => {
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      console.log(branchRequest);
      const response = await axios.post(
        "http://localhost:8088/api/public/branch/create-branch",
        branchRequest,
        config
      );
      if (response.data.statusCode === 200) {
        setIsModalOpen(true)
        setResponseMessage(response.data.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="post-branch">
      <div>
        {isAdmin && (
          <center>
            <h5>Create Branch</h5>
            <input
              type="text"
              placeholder="Branch Name"
              value={branchRequest.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={branchRequest.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <div className="btn-picking-out">
              <Button className="btn-antd" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </center>
        )}
      </div>
      <div>
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Notify"
          message={responeMessage} />
      </div>
    </div >
  );
}
export default PostBranch;
