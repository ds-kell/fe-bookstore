import React, { useState, useEffect } from "react";
import axios from "axios";
import "./book.css";
import { Button } from "antd";
import DropdownCategory from "../Category/DropdownCategory";

import Select from "react-select";
import { colourOptions } from "./test.ts";

function PostPickingIn() {
  const accessToken = localStorage.getItem("token");
  let config = {};
  const [bookRequests, setBookRequests] = useState([
    {
      name: "",
      importPrice: 0,
      exportPrice: 0,
      categoryId: 0,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (index, field, value) => {
    const updatedRequests = [...bookRequests];
    updatedRequests[index][field] = value;
    setBookRequests(updatedRequests);
  };

  const handleCategoryChange = (index, categoryId) => {
    const updatedRequests = [...bookRequests];
    updatedRequests[index].categoryId = categoryId;
    setBookRequests(updatedRequests);
  };

  const handleSubmit = async () => {
    console.log(selectedOption);
  };

  const handleAddBookRequest = () => {
    setBookRequests([
      ...bookRequests,
      { name: "", importPrice: 0, exportPrice: 0, categoryId: 0 },
    ]);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="container">
      <div className="row">
        <div>
          {bookRequests.map((request, index) => (
            <div className="create-book-block" key={index}>
              <input
                type="text"
                placeholder="Book Name"
                value={request.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Import price"
                value={request.importPrice}
                onChange={(e) =>
                  handleChange(index, "importPrice", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Export price"
                value={request.exportPrice}
                onChange={(e) =>
                  handleChange(index, "exportPrice", e.target.value)
                }
              />
              <div className="select-category">
                <DropdownCategory
                  onCategoryChange={(categoryId) =>
                    handleCategoryChange(index, categoryId)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="btn-create-book">
          <Button className="btn-antd" onClick={handleAddBookRequest}>
            Add Book
          </Button>
          <Button className="btn-antd" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <Select
          defaultValue={selectedOption}
          isMulti
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    </div>
  );
}

export default PostPickingIn;
