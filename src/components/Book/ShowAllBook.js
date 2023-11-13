import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./bookdetail.css";
import { TbH2 } from "react-icons/tb";

const ShowBookDetail = ({ listBooks }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div>
            <h2>Book List</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Import Price</th>
                  <th>Export Price</th>
                </tr>
              </thead>
              <tbody>
                {listBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.importPrice}</td>
                    <td>{book.exportPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBookDetail;
