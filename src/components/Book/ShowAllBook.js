import React from "react";
import "./bookdetail.css";

const ShowBookDetail = ({ listBooks }) => {

  return (
    <div className="">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Import Price</th>
                  <th>Export Price</th>
                </tr>
              </thead>
              <tbody>
                {listBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.importPrice}</td>
                    <td>{book.exportPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBookDetail;
