import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { MdOutlineFactory } from "react-icons/md";
import "./book.css";

const ShowBook = ({ listBooks }) => {
  // page
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentBooks = listBooks.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const handleRowClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };
  // filter
  const categories = [
    ...new Set(listBooks.map((book) => book.bookDto.categoryDto.name)),
  ];
  const branches = [...new Set(listBooks.map((book) => book.branch.name))];

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
          selectedBranches.includes(book.branch.name)
        )
      : filteredByCategory;

  const currentBooks = filteredByBranch.slice(startIndex, endIndex);
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

  return (
    <div className="container">
      <div className=" row book-block">
        <div className="col-sm-4 col-md-2 col-lg-2">
          <div className="sidebar">
            <div className="filter-group">
              <div className="filter-title">
                <TbCategory className="filter-icon" />
                <h5>Category</h5>
              </div>
              <div className="filter-item">
                {categories.map((category) => (
                  <label key={category} className="checkbox-label">
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
                  <label key={branch} className="checkbox-label">
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
        <div className=" col-sm-8 col-md-10 col-lg-10">
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Import Price</th>
                <th>Export Price</th>
                <th>Quantity</th>
                <th>Category Name</th>
                <th>Branch Name</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr
                  key={book.id}
                  onClick={() => handleRowClick(book.id)}
                  className="table-row"
                >
                  <td>{book.bookDto.name}</td>
                  <td>{book.bookDto.importPrice}</td>
                  <td>{book.bookDto.exportPrice}</td>
                  <td>{book.quantity}</td>
                  <td>{book.bookDto.categoryDto.name}</td>
                  <td>{book.branch.name}</td>
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
      </div>
    </div>
  );
};

export default ShowBook;
