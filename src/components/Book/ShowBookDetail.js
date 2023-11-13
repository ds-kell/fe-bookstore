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
    navigate("/book/edit");
  };
  const handleProposalClick = (bookDetailId) => {
    navigate(`/book/create-proposal/${bookDetailId}`);
  };
  const handlePickingOutClick = (bookDetailId) => {
    navigate(`/book/picking-out/${bookDetailId}`);
  };
  const handlePickingInClick = (bookDetailId) => {
    navigate(`/book/picking-in/${bookDetailId}`);
  };
  return (
    <div className="container">
      <div className="row">
      <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className="book-detail-block">
            <h2>{bookDetail.bookDto.name}</h2>
            <p>Import price: {bookDetail.bookDto.importPrice}</p>
            <p>Export price: {bookDetail.bookDto.exportPrice}</p>
            <p>Quantity: {bookDetail.quantity}</p>
            <p>Category: {bookDetail.bookDto.categoryDto.name}</p>
            <p>Branch: {bookDetail.branchDto.name}</p>
            <p>Address: {bookDetail.branchDto.address}</p>
          </div>
        </div>
        <div className="col-md-4">
          <Button
            className="btn-bookdetail"
            onClick={() => handleEditClick(bookDetail.bookDto.id)}
          >
            Edit book
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handleProposalClick(bookDetail.id)}
          >
            Create proposal
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handlePickingOutClick(bookDetail.id)}
          >
            Picking out
          </Button>
          <Button
            className="btn-bookdetail"
            onClick={() => handlePickingInClick(bookDetail.id)}
          >
            Picking in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowBookDetail;
