import React from "react";

const ExpenseTable = ({ data }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Branch Name</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.user.username}</td>
                            <td>{item.user.branch.name}</td>
                            <td>{item.total}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
