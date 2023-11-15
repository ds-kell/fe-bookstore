import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import ShowBranch from './ShowBranch';


function GetBranch() {
  const [listBranches, setListBranches] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get('http://localhost:8088/api/public/branch/all-branch', config);
          console.log(response.data)
        setListBranches(response.data);
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
      {listBranches ? <ShowBranch data={listBranches} /> : <p>Loading...</p>}
    </div>
  )
}

export { GetBranch };