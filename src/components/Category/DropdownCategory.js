import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

import "./category.css";

function DropdownCategory(props) {
  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get(
            "http://localhost:8088/api/private/category/all-category",
            config
          );
          setListCategories(response.data.data);
          console.log(listCategories)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, []);

  const [categorySelectedId, setCategorySelectedId] = useState("");

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setCategorySelectedId(categoryId);
    props.onCategoryChange(categoryId);
  };
  return (
    <div>
      <select value={categorySelectedId} onChange={handleCategoryChange}>
        {listCategories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <Select
        defaultValue={categorySelectedId}
        onChange={setCategorySelectedId}
        options={listCategories}
      />
    </div>
  );
}

export default DropdownCategory;
