import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ShowStaffInfo from './ShowStaffInfo.js';

function GetStaffInfo() {
  const [staffInfo, setStaffInfo] = useState();
  const { userId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get(`http://localhost:8088/api/private/user/${userId}`, config);
          setStaffInfo(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("No access token found.");
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div className=''>
      <div className=''>
        {staffInfo ? <ShowStaffInfo staff={staffInfo} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default GetStaffInfo;

