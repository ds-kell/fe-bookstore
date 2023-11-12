import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ShowBookDetail from './ShowBookDetail';

function GetBookDetail() {
  const [bookDetail, setBookDetail] = useState();
  const { bookDetailId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get(`http://localhost:8088/api/private/book/detail/${bookDetailId}`, config);
          setBookDetail(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, [bookDetailId]);

  return (
    <div className='container'>
      <div className=''>
        {bookDetail ? <ShowBookDetail bookDetail={bookDetail} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default GetBookDetail;

