import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import ShowCategory from './ShowCategory';


function GetCategory() {
    const [listCategories, setListCategories] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                const config = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
                };

                try {
                    const response = await axios.get('http://localhost:8088/api/private/category/all-category', config);
                    setListCategories(response.data.data);
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
            <ShowCategory data={listCategories} />
    </div>
    )
}

export default GetCategory;