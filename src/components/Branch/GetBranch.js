import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

const accessToken = sessionStorage.getItem('token');

let config = {};
if (true) {
  config = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTEyMTUxOCwiZXhwIjoxNjk5MjA3OTE4fQ.zBeGlR460dfuRIETYVPi4fLvDaWA6n6_HfuAIxoamUh49g7Sjvypd0W4ziOvSLmp'}
  };
}

function GetBranch() {
  const [listBranches, setListBranches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8088/api/private/branch/all-branch', config);
        console.log(response.data)
        setListBranches(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {/* <ShowBranch listBranches={listBranches} /> */}
    </div>
  )
}

export { GetBranch };