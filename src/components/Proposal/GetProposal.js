import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'


function GetProposal() {
    const [listProposals, setListProposals] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                const config = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
                };

                try {
                    const response = await axios.get('http://localhost:8088/api/private/proposal/all-proposal', config);
                    setListProposals(response.data.data);
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
            {/* <ShowProposal listProposals={listProposals} /> */}
    </div>
    )
}

export { GetProposal };