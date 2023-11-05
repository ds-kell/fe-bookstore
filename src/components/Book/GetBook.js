import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ShowBook from './ShowBook';

const accessToken = sessionStorage.getItem('token');

let config = {};
if (true) {
  config = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTEyMTUxOCwiZXhwIjoxNjk5MjA3OTE4fQ.zBeGlR460dfuRIETYVPi4fLvDaWA6n6_HfuAIxoamUh49g7Sjvypd0W4ziOvSLmp'}
  };
}

function GetBook() {
  const [listBooks, setListBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8088/api/private/book/all-book-detail', config);
        setListBooks(response.data.data);
      } catch (error) {
        console.log(error);
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