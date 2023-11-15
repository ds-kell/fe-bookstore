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
      // console.log(categoryRequest);
      const response = await axios.post("http://localhost:8088/api/private/category/create-category",categoryRequest,config);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Category Name"
        value={categoryRequest.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={categoryRequest.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <div className="btn-picking-out">
        <Button className="btn-antd" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
export default PostCategory;
