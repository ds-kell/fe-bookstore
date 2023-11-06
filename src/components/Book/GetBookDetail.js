import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import ShowBookDetail from './ShowBookDetail';

const accessToken = sessionStorage.getItem('token');
let config = {};
if (accessToken) {
  config = {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken.slice(1,-1) },
  };
}

function GetBookDetail() {
  const [bookDetail, setBookDetail] = useState();
  const { bookId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const accessToken = sessionStorage.getItem("token");
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get(`http://localhost:8088/api/private/book/${bookId}`, config);
          setBookDetail(response.data.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, [bookId]);

  return (
    <div className='container'>
      <div className=''>
        {bookDetail ? <ShowBookDetail bookDetail={bookDetail} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default GetBookDetail;

