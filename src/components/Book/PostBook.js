import React, { useState, useEffect } from "react";
import axios from "axios";
import "./book.css";
import { Button } from "antd";
import Select from "react-select";

function PostBook() {
  const accessToken = localStorage.getItem("token");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [bookRequests, setBookRequests] = useState([
    { name: "", importPrice: 0, exportPrice: 0, categoryId: 0 },
  ]);

  const config = {
    method: "POST",
    headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8088/api/private/category/all-category",
          config
        );
        setListCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const categoryOptions = listCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (index, field, value) => {
    const updatedRequests = [...bookRequests];
    updatedRequests[index][field] = value;
    setBookRequests(updatedRequests);
  };

  const handleAddBookRequest = () => {
    setBookRequests([
      ...bookRequests,
      { name: "", importPrice: 0, exportPrice: 0, categoryId: 1 },
    ]);

    // Add a default selected category for the new book request
    setSelectedCategories([...selectedCategories, null]);
  };

  const handleCategorySelect = (category, index) => {
    const updatedCategories = [...selectedCategories];
    updatedCategories[index] = category;
    setSelectedCategories(updatedCategories);

    const updatedRequests = [...bookRequests];
    updatedRequests[index].categoryId = category?.value || 0;
    setBookRequests(updatedRequests);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8088/api/private/book/create-book",
        bookRequests,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
                <Select
                  defaultValue={selectedCategories[index]}
                  onChange={(selectedCategory) =>
                    handleCategorySelect(selectedCategory, index)
                  }
                  value={categoryOptions.find(
                    (option) =>
                      option.value === selectedCategories[index]?.value
                  )}
                  options={categoryOptions}
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
      </div>
    </div>
  );
}

export default PostBook;
