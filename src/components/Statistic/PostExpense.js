import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import CustomModal from '../CustomModal'

import { Button } from "antd";

function PostExpense() {
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

 
  let config = {};
  const [expenseData, setExpenseData] = useState({
    name: "",
    total: 0,
    note: "",
    date: new Date().toISOString(),
  });

  const handleChangeUser = (field, value) => {
    setExpenseData({
      ...expenseData,
      [field]: value,
    });
  };
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSubmitExpense = async () => {
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      // console.log(expenseData);
      const response = await axios.post(
        "http://localhost:8088/api/private/expense/create-expense",
        expenseData,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              onChange={(e) => handleChangeUser("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Total</label>
            <input
              type="number"
              id="name"
              placeholder="total"
              onChange={(e) => handleChangeUser("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Date</label>
            <input
              type="date"
              id="date"
              onChange={(e) => handleChangeUser("date", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Note</label>
            <textarea
              placeholder="Note"
              id="note"
              onChange={(e) => handleChangeUser("note", e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3"></div>
        <div className="btn-create-expense">
          <Button className="btn-antd" onClick={handleSubmitExpense}>
            Submit expense
          </Button>
        </div>
        <div>
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Notify"
          message={responeMessage} />
      </div>
      </div>
    </div >
  );
}
export default PostExpense;
