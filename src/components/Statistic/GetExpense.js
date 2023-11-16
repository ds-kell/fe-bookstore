import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import ExpenseTable from "./ExpenseTable";


function GetExpense() {
    const [listExpenses, setListExpenses] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                const config = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
                };
                try {
                    const response = await axios.get('http://localhost:8088/api/private/expense/expenses', config);
                    console.log(response.data.data)
                    setListExpenses(response.data.data);
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
            {listExpenses ? <ExpenseTable data={listExpenses} /> : <p>Loading...</p>}
        </div>
    )
}

export { GetExpense };