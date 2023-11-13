import React, { useState, useEffect } from "react";
import { BiDownArrow } from "react-icons/bi";
import "./booktable.css";

const BookTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [categoryFilters, setCategoryFilters] = useState([]);
  const [filteredBySearch, setBranchFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter(
        item =>
          item.bookDto.name.toLowerCase().includes(searchKeyword.toLowerCase())
          // || item.bookDto.categoryDto.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, data]);
  const handleExpandeClick = (bookId) => {
    const isRowExpanded = expandedRows.includes(bookId);

    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((id) => id !== bookId));
    } else {
      setExpandedRows([...expandedRows, bookId]);
    }
  };


  return (
    <div className="container">
      <div className="row">
        {/* <div className="col-sm-4 col-md-2 col-lg-2">
         
        </div> */}
        <div className=" col-sm-8 col-md-10 col-lg-10">
          <div>
            <input
              type="text"
              id="search"
              placeholder="Search by book name"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Import Price</th>
                  <th>Export Price</th>
                  <th>Category</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <React.Fragment key={item.bookDto.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.bookDto.name}</td>
                      <td>{item.bookDto.importPrice}</td>
                      <td>{item.bookDto.exportPrice}</td>
                      <td>{item.bookDto.categoryDto.name}</td>
                      <td>
                        <span onClick={(e) => e.stopPropagation()}>
                          <BiDownArrow
                            className="arrow-icon"
                            onClick={() => handleExpandeClick(item.bookDto.id)}
                            style={{
                              transform: expandedRows.includes(item.bookDto.id)
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                    {expandedRows.includes(item.bookDto.id) && (
                      <tr>
                        <td colSpan="1"></td>
                        <td colSpan="4">
                          <table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Branch</th>
                                <th>Address</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.bookDetailDtos.map((detail, index) => (
                                <tr key={detail.id}>
                                  <td>{index + 1}</td>
                                  <td>{detail.branchDto.name}</td>
                                  <td>{detail.branchDto.address}</td>
                                  <td>{detail.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td colSpan="1"></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
