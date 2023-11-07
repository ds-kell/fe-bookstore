import axios from "axios";
import React, { useState, useEffect } from "react";

import ShowProfile from "./ShowProfile"; 

function GetProfile() {
  const [profile, setProfile] = useState();
  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        const config = {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
        };

        try {
          const response = await axios.get("http://localhost:8088/api/private/user/info", config);
          setProfile(response.data.data);
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
    <div className="container">
      <div className="">
        {profile ? (
          <ShowProfile profile={profile} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default GetProfile;
