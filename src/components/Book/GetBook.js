import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ShowBook from './ShowBook';

const accessToken = sessionStorage.getItem('token');
let config = {};
if (accessToken) {
  config = {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken.slice(1,-1) },
  };
}
function GetBook() {
  const [listBooks, setListBooks] = useState([]);
  useEffect(() => {
    const accessToken = sessionStorage.getItem('token');
    async function fetchData() {
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };
        try {
          const response = await axios.get('http://localhost:8088/api/private/book/all-book-detail', config);
          setListBooks(response.data.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <ShowBook listBooks={listBooks} />
    </div>
  )
}

export { GetBook };