import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import './bookdetail.css'
import { Button } from "antd";

const ShowBookDetail = ({ bookDetail }) => {
  const [statusEdit, setStatusEdit] = useState(false);
  const handleEdit = () => {
    setStatusEdit(!statusEdit);
  };
  const handleUpdate = () => {
    setStatusEdit(false);
  };

    return (
        <div className='container'>
            <div className='book-detail-block'>
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
    );
}

export default ShowBookDetail;
