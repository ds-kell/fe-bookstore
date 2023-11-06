import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

const accessToken = sessionStorage.getItem('token');
let config = {};
if (accessToken) {
  config = {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken.slice(1,-1) },
  };
}

function GetBranch() {
  const [listBranches, setListBranches] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const accessToken = sessionStorage.getItem('token');
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get('http://localhost:8088/api/private/branch/all-branch', config);
        setListBranches(response.data.data);
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
      {/* <ShowBranch listBranches={listBranches} /> */}
    </div>
  )
}

export { GetBranch };