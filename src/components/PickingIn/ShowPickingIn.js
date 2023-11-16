import React from "react";

const ShowPickingIn = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Branch Name</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Book Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {item.pickingInDetailDtos.map((detail) => (
                            <tr key={detail.id}>
                                <td>{index + 1}</td>
                                <td>{item.user.username}</td>
                                <td>{item.user.branch.name}</td>
                                <td>{item.total}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>{item.note}</td>
                                <td>{detail.bookDto.name}</td>
                                <td>{detail.quantity}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default ShowPickingIn;
