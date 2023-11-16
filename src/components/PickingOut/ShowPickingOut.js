import React from "react";

const ShowPickingOut = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Branch Name</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Customer Name</th>
                    <th>Customer Phone</th>
                    <th>Book Name</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {item.pickingOutDetailDtos.map((detail) => (
                            <tr key={detail.id}>
                                <td>{index + 1}</td>
                                <td>{item.user.username}</td>
                                <td>{item.user.branch.name}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>{item.note}</td>
                                <td>{item.customerName}</td>
                                <td>{item.customerPhone}</td>
                                <td>{detail.bookDto.name}</td>
                                <td>{detail.quantity}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default ShowPickingOut;
