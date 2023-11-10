import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ShowStaff from './ShowStaff';
function GetStaff() {
  const [listStaffs, setListStaffs] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    async function fetchData() {
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };
        console.log(config)
        try {
          const response = await axios.get('http://localhost:8088/api/private/all-user', config);
          setListStaffs(response.data.data);
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
      <ShowStaff listStaffs={listStaffs} />
    </div>
  )
}

export default GetStaff;