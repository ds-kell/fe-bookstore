import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import CustomModal from '../CustomModal'
import './expense.css'
import { Button } from "antd";

function PostExpense() {
  const accessToken = localStorage.getItem("token");

  let config = {};
  const [expenseData, setExpenseData] = useState({
    name: "",
    total: 0,
    note: "",
    date: new Date().toISOString(),
  });

  const handleChangeExpense = (field, value) => {
    console.log("Value before parsing:", value);
    setExpenseData({
      ...expenseData,
      [field]: field === "total" ? parseInt(value, 10) : value,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responeMessage, setResponseMessage] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload(); 
  };

  const handleSubmitExpense = async () => {
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      const response = await axios.post(
        "http://localhost:8088/api/private/expense/create-expense",
        expenseData,
        config
      );
      if (response.data.statusCode === 200) {
        setResponseMessage(response.data.message)
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  return (
      <div className="">
        <center>
        </center>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="name"
            onChange={(e) => handleChangeExpense("name", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total">Total</label>
          <input
            type="number"
            id="total"
            placeholder="total"
            onChange={(e) => handleChangeExpense("total", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={(e) => handleChangeExpense("date", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea
            placeholder="Note"
            id="note"
            onChange={(e) => handleChangeExpense("note", e.target.value)}
          />
        </div>
        <div className="btn-create-expense">
          <Button className="btn-statistic" onClick={handleSubmitExpense}>
            Create expense
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
  );
}
export default PostExpense;
