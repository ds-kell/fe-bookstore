import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import ShowBookDetail from './ShowBookDetail';

const accessToken = sessionStorage.getItem('token');

let config = {};
if (true) {
  config = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTEyMTUxOCwiZXhwIjoxNjk5MjA3OTE4fQ.zBeGlR460dfuRIETYVPi4fLvDaWA6n6_HfuAIxoamUh49g7Sjvypd0W4ziOvSLmp' }
  };
}


function GetBookDetail() {
  const [bookDetail, setBookDetail] = useState();
  const { bookId } = useParams();
  useEffect(() => {
    async function fetchBookDetail() {
      try {
        if (bookId) {
          const response = await axios.get(`http://localhost:8088/api/private/book/${bookId}`, config);
          console.log(response.data);
          setBookDetail(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchBookDetail();
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

