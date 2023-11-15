import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

import "./category.css";

function SelectCategory({onSelectCategory}) {
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
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, []);

  const [categorySelected, setCategorySelected] = useState();

  const categoryOptions = listCategories.map(category => ({
    value: category.id,
    label: category.name
  }));

  useEffect(() => {
    onSelectCategory(categorySelected);
  }, [categorySelected, onSelectCategory]);

  return (
    <div>
      <Select
      value={categoryOptions.find((option) => option.value === categorySelected)}
      onChange={(selectedOption) => setCategorySelected(selectedOption?.value)}
      isMulti
      options={categoryOptions}
    />
    </div>
  );
}

export default SelectCategory;
