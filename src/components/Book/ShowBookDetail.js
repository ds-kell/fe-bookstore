import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./bookdetail.css";

const ShowBookDetail = ({ bookDetail }) => {
  const [statusEdit, setStatusEdit] = useState(false);

  const navigate = useNavigate();

  const handleImportClick = (bookId) => {
    navigate("import");
  };
  const handleEditClick = (bookId) => {
    navigate("edit");
  };
  const handleProposalClick = (bookId) => {
    navigate("create-proposal");
  };
  const handlePickingOutClick = (bookId) => {
    navigate("picking-out");
  };
  const handlePickingInClick = (bookId) => {
    navigate("picking-in");
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
          <Button
            className="btn-bookdetail"
            onClick={() => handleEditClick(bookDetail.bookDto.id)}
          >
            Edit book
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handleImportClick(bookDetail.bookDto.id)}
          >
            Import book
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handleProposalClick(bookDetail.bookDto.id)}
          >
            Create proposal
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handlePickingOutClick()}
          >
            Picking out
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handlePickingInClick()}
          >
            Picking in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowBookDetail;
