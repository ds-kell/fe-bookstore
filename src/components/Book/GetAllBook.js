import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BookTable from './BookTable';
// import ShowAllBook from './ShowAllBook';

function GetAllBook() {
  const [data, setDate] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    async function fetchData() {
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };
        try {
          const response = await axios.get('http://localhost:8088/api/private/book/all-detail-by-all-book', config);
          setDate(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      {data ? <BookTable data={data} /> : <p>Loading...</p>}
    </div>
  )
}

export { GetAllBook };