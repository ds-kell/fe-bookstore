import React, { useState, useEffect } from "react";
import axios from "axios";
import "./proposal.css";
import { Checkbox } from "../../pages/Checkbox";
import { Button } from "antd";
import EditProposalRq from "./EditProposalRq";

const accessToken = localStorage.getItem("token");
const config = {
  method: "GET",
  headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
};

function MultiPostProposal() {
  const [listBooks, setListBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:8088/api/private/book/all-book",
            config
          );
          setListBooks(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, []);

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
      setSelected(listBooks.map((item) => item));
    } else {
      setSelected([]);
    }
  }

  // search

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBySearch = searchTerm
    ? listBooks.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : listBooks;

  return (
    <div className="row">
      <div className="col-md-10">
        <div>
          <div>
            <input
              type="text"
              id="search"
              placeholder="Search by book name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                    value={selected.length === listBooks.length}
                    updateValue={selectAll}
                  >
                    All
                  </Checkbox>
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Import Price</th>
                <th>Export Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredBySearch.map((book) => (
                <tr key={book.id}>
                  <td>
                    <Checkbox
                      id={book}
                      key={book.id}
                      name={book.name}
                      value={selected.includes(book)}
                      updateValue={handleSelect}
                    ></Checkbox>
                  </td>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.categoryDto.name}</td>
                  <td>{book.importPrice}</td>
                  <td>{book.exportPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="">
          {selected.length != 0 ? (
            <EditProposalRq data={selected} />
          ) : (
            <div>
              <center>Select book...</center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MultiPostProposal;
