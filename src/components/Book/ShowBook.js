import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './book.css'

const ShowBook = ({ listBooks }) => {

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = listBooks.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const handleRowClick = (bookId) => {
    navigate(`/book/${bookId}`);
  }

  return (
    <div className='container scrollable-content'>
      <div className='col-md-1'>
      </div>
      <div className='col-md-10'>
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
              <tr key={book.id} onClick={() => handleRowClick(book.id)} className="table-row">
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
        <div className='row'>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='col-md-1'>
      </div>
    </div>
  );
};

export default ShowBook;

