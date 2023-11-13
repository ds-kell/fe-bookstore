import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

function Book() {
  const navigate = useNavigate();

  const handleViewBookClick = () => {
    navigate("view-book");
  };
  const handleViewBookDetailClick = () => {
    navigate("view-book-detail");
  };
  const handleCreateBookClick = () => {
    navigate("create-book");
  };
  const handleProposalClick = () => {
    navigate(`create-proposal`);
  };
  const handlePickingOutClick = () => {
    navigate(`picking-out`);
  };
  const handlePickingInClick = () => {
    navigate(`picking-in`);
  };

  return (
    <div className="body container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 book-block">
          <Button className="btn-book" onClick={() => handleViewBookClick()}>
            View book
          </Button>
          <Button
            className="btn-book"
            onClick={() => handleViewBookDetailClick()}
          >
            View book detail
          </Button>
          <Button className="btn-book" onClick={() => handleCreateBookClick()}>
            Create book
          </Button>
          {/* <Button className="btn-book" onClick={() => handleEditClick()}>
            Edit book
          </Button> */}
          <Button className="btn-book" onClick={() => handleProposalClick()}>
            Create proposal
          </Button>
          <Button className="btn-book" onClick={() => handlePickingOutClick()}>
            Picking out
          </Button>
          <Button className="btn-book" onClick={() => handlePickingInClick()}>
            Picking in
          </Button>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default Book;
