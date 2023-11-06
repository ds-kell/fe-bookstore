import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const brands = [...new Set(listBooks.map((book) => book.branch.name))];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const filteredByCategory =
    selectedCategories.length > 0
      ? listBooks.filter((book) =>
          selectedCategories.includes(book.bookDto.categoryDto.name)
        )
      : listBooks;

  const filteredByBrand =
    selectedBrands.length > 0
      ? filteredByCategory.filter((book) =>
          selectedBrands.includes(book.branch.name)
        )
      : filteredByCategory;

  const currentBooks = filteredByBrand.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredByBrand.length / itemsPerPage);

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      updatedBrands.splice(updatedBrands.indexOf(brand), 1);
    } else {
      updatedBrands.push(brand);
    }
    setSelectedBrands(updatedBrands);
  };

  return (
    <div className="container">
      <div className=" row book-block">
        <div className="col-sm-4 col-md-2 col-lg-2">
          <div className="sidebar">
            <div className="filter-group">
              <h5>Danh mục</h5>
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
              <h5>Thương hiệu</h5>
              <div className="filter-item">
                {brands.map((brand) => (
                  <label key={brand} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
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
