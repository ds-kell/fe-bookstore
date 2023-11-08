import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'


function GetPickingIn() {
    const [listPickingIns, setListPickingIns] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                const config = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
                };

                try {
                    const response = await axios.get('http://localhost:8088/api/private/picking-in/all-picking-in', config);
                    setListPickingIns(response.data.data);
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
            {/* <ShowPickingIn listPickingIns={listPickingIns} /> */}
    </div>
    )
}

export { GetPickingIn };