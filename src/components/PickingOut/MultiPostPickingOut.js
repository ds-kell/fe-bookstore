import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowBook from "../Book/ShowBook";
import "./pickingout.css";
import EditPickingOut from "./EditPickingOut";

const accessToken = localStorage.getItem("token");
const config = {
  method: "GET",
  headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
};

function MultiPostPickingOut() {
  const [listBooks, setListBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:8088/api/private/book/all-book-detail",
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

  const [listBookPickingOut, setListBookPickingOut] = useState([]);
  
  return (
    <div className="row">
      <div className="col-md-10">
        <div>
          {listBooks ? (
            <ShowBook
              listBooks={listBooks}
              setListBookPickingOut={setListBookPickingOut}
            />
          ) : (
            <center>
              <p>Loading...</p>
            </center>
          )}
        </div>
        <div>
          <div className="">
            {listBookPickingOut.length != 0 ? (
              <EditPickingOut data={listBookPickingOut} />
            ) : (
              <div>
                <center>Select book...</center>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MultiPostPickingOut;
