import React, { useState, useEffect } from "react";
import axios from "axios";
import "./book.css";
import { Button } from "antd";
import SelectCategory from "../Category/SelectCategory";

function PostBook() {
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

  const handleChange = (index, field, value) => {
    const updatedRequests = [...bookRequests];
    updatedRequests[index][field] = value;
    setBookRequests(updatedRequests);
  };
  const handleSubmit = async () => {
    console.log(selectedCategory);
  };

  const handleAddBookRequest = () => {
    setBookRequests([
      ...bookRequests,
      { name: "", importPrice: 0, exportPrice: 0, categoryId: 0 },
    ]);
  };
  const [selectedCategory, setSelectedCategory] = useState();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className="">
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
                <SelectCategory onSelectCategory={handleCategorySelect} />
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
        <p>Selected Category ID: {selectedCategory}</p>
      </div>
    </div>
  );
}

export default PostBook;
