import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import "./booktable.css";
import { Checkbox } from "../../pages/Checkbox";

const BookTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [filteredData, setFilteredData] = useState(data);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
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

  const handleNestedRowClick = (bookDetailId) => {
    navigate(`/book/detail/${bookDetailId}`);
  };
  const handleRowClick = (bookId) => {
    navigate(`${bookId}`);
  };
  //

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
      setSelected(filteredData.map((item) => item.bookDto.id));
    } else {
      setSelected([]);
    }
  }

  function handleSubmit() {
    console.log(selected);
  }
  return (
    <div className="">
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
              <th>
                {/* <Checkbox
                      id=""
                      name="all"
                      value={selected.length === filteredData.length}
                      updateValue={selectAll}
                    >
                      All
                    </Checkbox> */}
              </th>
              <th>No</th>
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
                  <td>
                    {/* <Checkbox
                          id={item.bookDto.id}
                          key={item.bookDto.id}
                          name={item.bookDto.name}
                          value={selected.includes(item.bookDto.id)}
                          updateValue={handleSelect}
                        ></Checkbox> */}
                  </td>
                  <td onClick={() => handleRowClick(item.bookDto.id)}>
                    {index + 1}
                  </td>
                  <td onClick={() => handleRowClick(item.bookDto.id)}>
                    {item.bookDto.name}
                  </td>
                  <td onClick={() => handleRowClick(item.bookDto.id)}>
                    {item.bookDto.importPrice}
                  </td>
                  <td onClick={() => handleRowClick(item.bookDto.id)}>
                    {item.bookDto.exportPrice}
                  </td>
                  <td onClick={() => handleRowClick(item.bookDto.id)}>
                    {item.bookDto.categoryDto.name}
                  </td>
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
                    <td colSpan="2"></td>
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
                            <tr
                              key={detail.id}
                              onClick={() =>
                                handleNestedRowClick(detail.id)
                              }
                            >
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
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default BookTable;
