import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { MdOutlineFactory } from "react-icons/md";
import "./book.css";
import { Checkbox } from "../../pages/Checkbox";
import { Button } from "antd";

const ShowBook = (props) => {
  const listBooks = props.listBooks;
  // page
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const handleRowClick = (bookDetailId) => {
    navigate(`/book/detail/${bookDetailId}`);
  };

  // filter
  const categories = [
    ...new Set(listBooks.map((book) => book.bookDto.categoryDto.name)),
  ];
  const branches = [...new Set(listBooks.map((book) => book.branchDto.name))];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  const filteredByCategory =
    selectedCategories.length > 0
      ? listBooks.filter((book) =>
          selectedCategories.includes(book.bookDto.categoryDto.name)
        )
      : listBooks;

  const filteredByBranch =
    selectedBranches.length > 0
      ? filteredByCategory.filter((book) =>
          selectedBranches.includes(book.branchDto.name)
        )
      : filteredByCategory;

  const totalPages = Math.ceil(filteredByBranch.length / itemsPerPage);

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };

  const handleBranchChange = (branch) => {
    const updatedBranches = [...selectedBranches];
    if (updatedBranches.includes(branch)) {
      updatedBranches.splice(updatedBranches.indexOf(branch), 1);
    } else {
      updatedBranches.push(branch);
    }
    setSelectedBranches(updatedBranches);
  };

  // search

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBySearch = searchTerm
    ? filteredByBranch.filter((bookDetail) =>
        bookDetail.bookDto.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredByBranch;
  // select

  const [selected, setSelected] = useState([]);
  function handleSelect(value, name, id) {
    if (value) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  }

  function selectAll(value) {
    if (value) {
      setSelected(filteredBySearch.map((item) => item));
    } else {
      setSelected([]);
    }
  }

  const { setListBookPickingOut } = props;
  useEffect(() => {
    setListBookPickingOut(selected);
  }, [selected]);
  //
  function handleSubmit() {
    console.log(selected);
  }
  const currentBooks = filteredBySearch.slice(startIndex, endIndex);

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="sidebar">
          <div className="filter-group">
            <div className="filter-title">
              <TbCategory className="filter-icon" />
              <h5>Category</h5>
            </div>
            <div className="filter-item">
              {categories.map((category) => (
                <label key={category.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <div className="filter-title">
              <MdOutlineFactory className="filter-icon" />
              <h5>Branch</h5>
            </div>
            <div className="filter-item">
              {branches.map((branch) => (
                <label key={branch.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBranches.includes(branch)}
                    onChange={() => handleBranchChange(branch)}
                  />
                  {branch}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <Button className="btn-clear" onClick={() => setSearchTerm("")}>
              Clear
            </Button>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  id=""
                  name="all"
                  value={selected.length === filteredBySearch.length}
                  updateValue={selectAll}
                >
                  All
                </Checkbox>
              </th>
              <th>Book Name</th>
              <th>Import Price</th>
              <th>Export Price</th>
              <th>Quantity</th>
              <th>Category Name</th>
              <th>Branch Name</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((bookDetail) => (
              <tr key={bookDetail.id}>
                <td>
                  <Checkbox
                    id={bookDetail}
                    key={bookDetail.id}
                    name={bookDetail.bookDto.name}
                    value={selected.includes(bookDetail)}
                    updateValue={handleSelect}
                  ></Checkbox>
                </td>
                <td
                  key={bookDetail.id}
                  onClick={() => handleRowClick(bookDetail.id)}
                  className="table-row"
                >
                  {bookDetail.bookDto.name}
                </td>
                <td>{bookDetail.bookDto.importPrice}</td>
                <td>{bookDetail.bookDto.exportPrice}</td>
                <td>{bookDetail.quantity}</td>
                <td>{bookDetail.bookDto.categoryDto.name}</td>
                <td>{bookDetail.branchDto.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-sm-0 col-md-2 col-lg-2"></div>
    </div>
  );
};

export default ShowBook;
