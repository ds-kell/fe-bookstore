import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./bookdetail.css";

const ShowBookDetail = ({ bookDetail }) => {
  const [statusEdit, setStatusEdit] = useState(false);
  const handleEdit = () => {
    setStatusEdit(!statusEdit);
  };
  const handleUpdate = () => {
    setStatusEdit(false);
  };

  return (
    <div className="container">
      <div className="row">
      <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className="book-detail-block">
            <h1>Book Details</h1>
            <p>Book Name: {bookDetail.bookDto.name}</p>
            <p>Import Price: {bookDetail.bookDto.importPrice}</p>
            <p>Export Price: {bookDetail.bookDto.exportPrice}</p>
            <p>Quantity: {bookDetail.quantity}</p>
            <p>Category Name: {bookDetail.bookDto.categoryDto.name}</p>
            <p>Branch Name: {bookDetail.branch.name}</p>
            <p>Branch Address: {bookDetail.branch.address}</p>
          </div>
        </div>
        <div className="col-md-2">
          <Button className="btn-bookdetail">Edit book</Button>
          <Button className="btn-bookdetail">Import book</Button>
          <Button className="btn-bookdetail">Create proposal</Button>
        </div>
      </div>
    </div>
  );
};

export default ShowBookDetail;
