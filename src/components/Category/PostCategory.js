import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "antd";

function PostCategory() {
  const accessToken = localStorage.getItem("token");
  let config = {};

  const [categoryRequest, setCategoryRequest] = useState({
    name: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setCategoryRequest({
      ...categoryRequest,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      console.log(categoryRequest);
      const response = await axios.post("http://localhost:8088/api/private/picking-in/create-picking-in", categoryRequest, config);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className="book-details">
            {bookDetail ? (
              bookDetail && (
                <div>
                  <h2>{bookDetail.bookDto.name}</h2>
                  <p>Import price: {bookDetail.bookDto.importPrice}</p>
                  <p>Export price: {bookDetail.bookDto.exportPrice}</p>
                  <p>Quantity: {bookDetail.quantity}</p>
                  <p>Category: {bookDetail.bookDto.categoryDto.name}</p>
                  <p>Branch: {bookDetail.branchDto.name}</p>
                  <p>Address: {bookDetail.branchDto.address}</p>
                </div>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="picking-block">
            {pickingInRequest.pickingInDetailRequests.map((detail, index) => (
              <div key={index}>
                <input
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  value={detail.quantity}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "quantity",
                      parseInt(e.target.value, 10)
                    )
                  }
                />
              </div>
            ))}
            <textarea
              placeholder="Note"
              value={pickingInRequest.note}
              onChange={(e) => handleChange("note", e.target.value)}
            ></textarea>
            <div className="btn-picking-in">
              <Button className="btn-antd" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostCategory;
